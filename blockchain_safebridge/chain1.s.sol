pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import "src/L1/WETH.sol";
import "src/L1/L1CrossDomainMessenger.sol";
import "src/L1/L1ERC20Bridge.sol";
import "src/Challenge.sol";

contract Deploy is Script {
    Challenge c;
    WETH weth;

    L1ERC20Bridge l1;
    L1CrossDomainMessenger m1;

    function setUp() public {
        c = Challenge(0x63149A7007961cAf310d707923ce36f621F8eb55);
        l1 = L1ERC20Bridge(c.BRIDGE());
        m1 = L1CrossDomainMessenger(c.MESSENGER());
        weth = WETH(payable(c.WETH()));
    }

    function run() public {
        // 1. print info for weth address
        printInfo();
        // 3. deposit with the new created token
        // deposit(address(0xAe5c6BBE63022b4e4A94E33f53B15383364dDc0f));
        // checkMoney();
    }

    function printInfo() public {
        console.log("this");
        console.logAddress(address(l1));
        console.log("l1 messenger:");
        console.logAddress(address(l1.messenger()));
        console.log("weth");
        console.logAddress(address(weth));
    }

    function deposit(address l2token) public {
        vm.startBroadcast();
        weth.deposit{value: 2 ether}();
        weth.approve(address(l1), 2 ether);
        l1.depositERC20(address(weth), l2token, 2 ether);
        vm.stopBroadcast();
    }

    function checkMoney() public {
        console.logUint(IERC20(c.WETH()).balanceOf(address(l1)));
    }

}

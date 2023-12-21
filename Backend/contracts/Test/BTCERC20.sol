// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BTCERC20 is ERC20 {

    address immutable i_owner;

    constructor() ERC20("BTCERC20","BTC") {
        i_owner = msg.sender;
        _mint(msg.sender,1000000000000000000000000);
    }

}

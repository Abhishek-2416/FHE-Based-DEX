// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BTCERC20 is ERC20 {

    address immutable i_owner;

    constructor() ERC20("BTCERC20","BTC") {
        i_owner = msg.sender;
        mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender != i_owner) {
            revert ();
        }
        _mint(to, amount);
    }
}

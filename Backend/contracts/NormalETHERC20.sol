// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NormalETHERC20 is ERC20 {

    address immutable i_owner;

    constructor() ERC20("ETHERC20","ETH") {
        i_owner = msg.sender;
        mint(msg.sender, 1000000);
    }

    function decimals() public view virtual override returns (uint8) {
        return 3;
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender != i_owner) {
            revert ();
        }
        _mint(to, amount);
    }
}

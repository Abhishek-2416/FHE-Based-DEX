// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {TFHE} from "fhevm/lib/TFHE.sol";

contract MockWrappingERC20 is ERC20 {
    

    constructor() ERC20("MOCK","MCK") {

    }

}
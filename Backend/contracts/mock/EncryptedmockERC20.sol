// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "fhevm/lib/TFHE.sol";

contract EncryptedMOCKERC20 {
  
    address public immutable contractOwner;
    // The mapping keep tracks of the balances and keeps them private by encrypting the balances 
    // The euint is a type that stores the reference of the encrypted value || hash of the cipher text
    // It basically stores the hash of the cipher 
    mapping(address => euint32) private _balances;

    constructor () {
        contractOwner = msg.sender;
    }

    /**
     * @param _amountCipherText the cipher text of the amount to mint
     * @dev Here instead of taking a eunit32 i am taking a bytes bcoz if i am taking a euint32 a malicious actor
     *      can try to use the smart contract to decipher values 
     *      SO if we take a bytes input it would be like a check to see if the person giving the input knows the
     *      value of the bytes that is being converted to euint rather than being a malicious actor trying to 
     *      just decrypt data 
     * 
     * @dev The bytes needs to be chacked to be a valid cipher text so that we can avoid a person trying to 
     *      use the smart contract as decryption oracle and even if the value is decrypted we can be sure 
     *      that the person who is sending the cipher text knows the underlying value 
     * 
     * 
     * Here we are expecting a user to call the function so we using bytes to get a fresh cipher text
     * If it was a contract calling it we would have used ----> euint256 _amount
     */
    function mint(bytes calldata _amountCipherText) public {
        require(msg.sender == contractOwner, "Only Owner can call");

        // Here this function call checks if the cipher text is well formed and that the user knows the the 
        // plain text value as well
        euint32 userinput = TFHE.asEuint32(_amountCipherText); 

        // using the library to increase the balance of the user by using the .add() method on encrypted data 
        _balances[msg.sender] = TFHE.add(_balances[msg.sender], userinput);
    }

}
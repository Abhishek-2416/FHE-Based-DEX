// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "fhevm/lib/TFHE.sol";
// This modifier is using the the input and the signature of the signer 
// Which then is used to check that the msg.sender calling the fuction is the correct person who is supposed to call 
// used while encrypting the data from the user side 
import "fhevm/abstracts/EIP712WithModifier.sol";


contract EncryptedMOCKERC20 is EIP712WithModifier {
  
    address public immutable contractOwner;
    // The mapping keep tracks of the balances and keeps them private by encrypting the balances 
    // The euint is a type that stores the reference of the encrypted value || hash of the cipher text
    // It basically stores the hash of the cipher 
    // The cipher text is encrypted under the public fhe key 
    mapping(address => euint32) internal _balances;

    constructor () EIP712WithModifier("Auth_ERC20", "1"){
        contractOwner = msg.sender;
    }

    // since the value is encrypted and stored 
    // even if the the user requests the value the cipher value will be returned and wont make sense
    // so we are going to ask the user to give a public key and encrypt using that public key  
    function balanceOf(bytes32 publicKey,bytes calldata signature) public view 
    onlySignedPublicKey(publicKey,signature)
    returns(bytes memory) {
        return TFHE.reencrypt(_balances[msg.sender], publicKey, 0);
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

    function transfer(address to, bytes calldata amountCipherText) public {
        euint32 amount = TFHE.asEuint32(amountCipherText);

        ebool  sufficient = TFHE.le(amount,_balances[msg.sender]);
        TFHE.optReq(sufficient);

        _balances[to] = TFHE.add(_balances[to], amount);
        _balances[msg.sender] = TFHE.sub(_balances[msg.sender], amount);
    }

}
const { createInstance } = require("fhevmjs");
const {  ethers, network } = require("hardhat");

let instance;
let provider;
let chainID;

provider = new ethers.providers.Web3Provider(network.provider)
chainID = 8011;

const getInstance = async () => {
    if (instance) return instance;

    // const network = new ethers.providers.getNetwork();

    let fhePublicKey = await provider.call({ to: "0x0000000000000000000000000000000000000044" });
    // const fhePublicKey = await provider.call({
    //     // fhe lib address, may need to be changed depending on network
    //     to: "0x000000000000000000000000000000000000005d",
    //     // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    //     // data: "0xd9d47bb001",
    //   });

    instance = await createInstance({
        chainId: 8011,
        publicKey: fhePublicKey,
      });

    console.log("ran the instance successfully")
    
    return instance;
}


async function mintToken (amount) {
    amount = 1000
    const contract = await ethers.getContract("EncryptedMOCKERC20");
    const fhevm = await getInstance();
  
    console.log(`Encrypting the amount sent : ${amount}`);
  
    const encryptedValue = fhevm.encrypt32(amount);
  
    console.log("Sending the transaction");
  
    const transaction = await contract.mint(encryptedValue);
    console.log("Waiting for the transaction to go through");
  
    await provider.waitForTransaction(transaction.hash);
  
    console.log("Transaction is done!!!!!!")
  
    const generateToken = fhevm.generateToken({
      // name: 'Authentication',
      verifyingContract: address,
    });
  
    console.log("Token generated!!!!!")
    
    // const sign = await signer._signTypedData(generateToken.token.domain,
    //     { Reencrypt: generateToken.token.types.Reencrypt }, // Need to remove EIP712Domain from types
    //       generateToken.token.message
    // );
  
    // console.log("Sign generated!!")
  
    // fhevm.setTokenSignature(address,sign);

    const account = ethers.getSigners()
     
    const encryptedBalance = await contract.balances(account[0]);
  
    // const balance = fhevm.decrypt(address, encryptedBalance);
  
    console.log(`The balance of the user is ${balance.toString()}`);
  
    return balance;
};

mintToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

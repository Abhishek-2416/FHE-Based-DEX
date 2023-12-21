const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./interaction");

// const contractAddress = "0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A";
const signer = new ethers.Wallet(process.env.Private_Key,provider);
const address = "0xceE69dC06aF4b9F5a8622FB8de4bd4678e1Fd2F7"


async function mintToken (amount) {
  amount = 1000
  const contract = await ethers.getContractAt("EncryptedMOCKERC20",address,signer);
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
  
  const userAddress = "0x1B150538E943F00127929f7eeB65754f7beB0B6d"; // metamask address
  
  const sign = await signer._signTypedData(generateToken.token.domain,
      { Reencrypt: generateToken.token.types.Reencrypt }, // Need to remove EIP712Domain from types
        generateToken.token.message
  );

  console.log("Sign generated!!")

  fhevm.setTokenSignature(address,sign);
   
  const encryptedBalance = await contract.balanceOf(generateToken.publicKey , sign);

  const balance = fhevm.decrypt(address, encryptedBalance);

  console.log(`The balance of the user is ${balance.toString()}`);

  return balance;
};
2

mintToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
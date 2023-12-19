const { ethers } = require("hardhat");
const { createInstance } = require("fhevmjs");

async function mintToken () {

  const instance = fhevmjs.createInstance({
    chainId: 8011,
    publicKey: tfhePublicKey,
  });

  const contractAddress = "0x2e1771fcEFFA28Fd49910AC8aAc647f01A86b58A";

  const address = await ethers.getSigner();

  const contract = await ethers.getContract("EncryptedMOCKERC20",contractAddress,address);
}


mintToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const { ethers } = require("hardhat");
const { createInstance } = require("fhevmjs");

async function mintToken () {

}


mintToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
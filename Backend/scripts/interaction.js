const { createInstance } = require("fhevmjs");
const { ethers } = require("ethers");
const { DEVNET_URL,zama_devnet } = require("../helper-hardhat-config");

let instance;
let provider;
let chainID;

provider = new ethers.JsonRpcProvider(zama_devnet);
chainID = 8011;

const getInstance = async () => {
    if (instance) return instance;

    const network = await ethers.provider.getNetwork();

    let fhePublicKey;
    fhePublicKey = await ethers.provider.call({ to: "0x0000000000000000000000000000000000000044" });

    instance = await createInstance({
        chainId: 8011,
        publicKey: fhePublicKey,
      });

    console.log("ran the instance successfully")
    
    return instance;

}

module.exports = {
    getInstance,
    provider
}
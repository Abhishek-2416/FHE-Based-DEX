const { createInstance } = require("fhevmjs");
const { ethers } = require("hardhat");
const { DEVNET_URL } = require("../helper-hardhat-config");

let instance;
const provider = new ethers.JsonRpcProvider(DEVNET_URL);

const getInstance = async () => {
    if (instance) return instance;

    const network = await ethers.provider.getNetwork();
    const chainID = network.chainId.toString();

    let fhePublicKey;
    fhePublicKey = await ethers.provider.call({ to: "0x0000000000000000000000000000000000000044" });

    instance = createInstance({chainID, fhePublicKey});

    return instance;
}
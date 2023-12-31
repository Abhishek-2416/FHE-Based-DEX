const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    args = [];

    const EncryptedMOCKERC20 = await deploy("EncryptedMOCKERC20", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the dpeloyed contract ${EncryptedMOCKERC20.address}`);

    log("------------------------------------------------------------------------");
}

module.exports.tags = ["all", "EncryptedMOCKERC20"];
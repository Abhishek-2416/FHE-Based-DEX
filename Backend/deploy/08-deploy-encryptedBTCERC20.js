const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;
    const chainid = network.config.chainId;
    log("deploy to the chainId " + chainid);

    args = [];

    const EncryptedBTCERC20 = await deploy("EncryptedBTCERC20", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the dpeloyed contract ${EncryptedBTCERC20.address}`);
    log("------------------------------------------------------------------------");

}

module.exports.tags = ["all", "EncryptedBTCERC20"];
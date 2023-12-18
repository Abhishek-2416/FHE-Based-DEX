const { network , ethers } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    const {deploy,log} = deployments;

    args = [];

    const EncryptedMOCKERC20 = await deploy("EncryptedMOCKERC20", {
        args: args,
        from: deployer,
        log: true,
    });

    log(`The address of the dpeloyed contract ${EncryptedMOCKERC20.address}`);

}

module.exports.tags = ["all", "EncryptedMOCKERC20"];
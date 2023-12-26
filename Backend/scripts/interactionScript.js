const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./interaction");

const signer = new ethers.Wallet(process.env.Private_Key,provider);
// const address = "0x1dCEB0c3055e94e0ec0a6b7BAA3fe04414041FeD"


async function Main() {

    const amount = 100000

    // Normal-ERC20 Zama 
    // const MockBTC =  await ethers.getContractAt("NormalBTCERC20","0x641dC96a45EB2a41704C7c96e8d19cc08B833501",signer);
    // const MockETH =  await ethers.getContractAt("NormalETHERC20","0x3a168E1514b205E182e8c0CD8a0bdbAD56c0725b",signer);
    // const Factory =  await ethers.getContractAt("FactoryFHE", "0xa98dae43641a0c4619f04b7f6c772a035Ed5F3dC",signer);

    // Ecrypted-ERC20 localfhenix 
    const MockBTC =  await ethers.getContractAt("NormalBTCERC20","0xFDBbC27522FEEDE6A4d448CDB1d05Da4C7Bad958",signer);
    const MockETH =  await ethers.getContractAt("NormalETHERC20","0x40206E8A9E064c4628315fD7b9d7264307eB76cf",signer);
    const Factory =  await ethers.getContractAt("FactoryFHE", "0x9e6099640bE387299F636e3cFB35cBc2b9f01606",signer);

    const fhevm = await getInstance();

    const encryptedValue = fhevm.encrypt32(amount);

    const accounts = await ethers.getSigners();

    console.log("The address connected to the network " + accounts[0].address);

    // NormalERC20 
    const beforeMint_hashBTC = await MockBTC.balanceOf(accounts[0].address);

    console.log("The Balance hash of BTC before mint " + beforeMint_hashBTC);

    // NormalERC20
    const beforeMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance hash of ETH before mint " + beforeMint_hashETH);

    await MockBTC.mint(accounts[0].address,amount);
    await MockETH.mint(accounts[0].address,amount);

    const AfterMint_hashBTC = await MockBTC.balanceOf(accounts[0].address);

    console.log("The Balance hash of BTC After mint " + AfterMint_hashBTC);

    const AfterMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance hash of ETH After mint " + AfterMint_hashETH);

    // await Factory.createPair(MockBTC.address,MockETH.address); 

    const pair = await Factory.getPair(MockETH.address,MockBTC.address);

    console.log(`The pair address that is created ${pair}`);

    const CPAMM = await ethers.getContractAt("Pair",pair,signer);
    
    const x = await CPAMM.totalSupply();
   
    console.log("The initial supply ", x.toString());
   
    const token = await CPAMM.token0();
   
    console.log(`the token initalized is ${token}`);

    await MockBTC.approve(pair,amount);
    await MockETH.approve(pair,amount);
    await CPAMM.addLiquidity(encryptedValue,encryptedValue);

    const supplyafterLiquidityAdded = await CPAMM.totalSupply();

    console.log("The initial supply ", supplyafterLiquidityAdded.toString());
}


Main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
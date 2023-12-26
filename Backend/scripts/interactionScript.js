const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./interaction");

const signer = new ethers.Wallet(process.env.Private_Key,provider);


async function Main() {

    const amount = 100000

    // Normal-ERC20 Zama 
    const MockBTC =  await ethers.getContractAt("NormalBTCERC20","0x3141F7A0bC08A49F25f37304b2f53247a36aA52f",signer);
    const MockETH =  await ethers.getContractAt("NormalETHERC20","0x699A0538067FEfcd3721151085F34696d3C4e4e2",signer);
    const Factory =  await ethers.getContractAt("FactoryFHE", "0xBc1666771b708458b97C34f6b98D229B0f045527",signer);


    // Ecrypted-ERC20 localfhenix 
    // const MockBTC =  await ethers.getContractAt("NormalBTCERC20","0xB585Fd45509a3564ddCC5Ed6DFc9d96363451fD6",signer);
    // const MockETH =  await ethers.getContractAt("NormalETHERC20","0xE065658225454a87D00D1428347E24B69790eAa9",signer);
    // const Factory =  await ethers.getContractAt("FactoryFHE", "0x3Cf5b95B7A516AE868182C0b0AfDB9dC62df6ecd",signer);

    const fhevm = await getInstance();

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

    console.log("The amount has been minted!!!!");

    const AfterMint_hashBTC = await MockBTC.balanceOf(accounts[0].address);

    console.log("The Balance hash of BTC After mint " + AfterMint_hashBTC);

    const AfterMint_hashETH = await MockETH.balanceOf(accounts[0].address);

    console.log("The Balance hash of ETH After mint " + AfterMint_hashETH);

    // await Factory.createPair(MockBTC.address,MockETH.address); 

    const pair = await Factory.getPair(MockETH.address,MockBTC.address);

    console.log(`The pair address that is created ${pair}`);

    const CPAMM = await ethers.getContractAt("Pair",pair);
    
    const x = await CPAMM.totalSupply();
   
    console.log("The initial supply ", x.toString());
   
    const token = await CPAMM.token0();
   
    console.log(`the token initalized is ${token}`);

    await MockBTC.connect(accounts[0]).approve(pair,amount);

    console.log("BTC Mock approved!!");

    await MockETH.approve(pair,amount);

    console.log("ETH Mock approved!!");

    const encryptedValue = fhevm.encrypt32(10000);

    await CPAMM.connect(accounts[0]).addLiquidity(encryptedValue,encryptedValue);

    const supplyafterLiquidityAdded = await CPAMM.totalSupply();

    console.log("The initial supply ", supplyafterLiquidityAdded.toString());
}


Main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
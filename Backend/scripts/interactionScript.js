const { ethers, network } = require("hardhat");
const { createInstance } = require("fhevmjs");
const { getInstance, provider } = require("./interaction");

const signer = new ethers.Wallet(process.env.Private_Key,provider);
// const address = "0x1dCEB0c3055e94e0ec0a6b7BAA3fe04414041FeD"


async function Main() {

    const amount = 100000

    const MockBTC =  await ethers.getContractAt("EncryptedBTCERC20","0x8B5d995740266cB2FD787564e68FA998B3722fb7",signer);
    const MockETH =  await ethers.getContractAt("EncryptedETHERC20","0x5c882C54dE0786FB504c59017BFA5Bb875808C5E",signer);
    const Factory =  await ethers.getContractAt("FactoryFHE", "0x696659513c11029f72AB9F3FE31BEe858958B342",signer);

    // const contract = await ethers.getContractAt("EncryptedMOCKERC20",address,signer);
    const fhevm = await getInstance();

    const encryptedValue = fhevm.encrypt32(amount);

    const accounts = await ethers.getSigners();

    const beforeMint_hashBTC = await MockBTC.balances(accounts[0].address);

    console.log("The Balance hash of BTC before mint " + beforeMint_hashBTC);

    const beforeMint_hashETH = await MockETH.balances(accounts[0].address);

    console.log("The Balance hash of ETH before mint " + beforeMint_hashETH);

    await MockBTC.mint(encryptedValue);
    await MockETH.mint(encryptedValue);

    const AfterMint_hashBTC = await MockBTC.balances(accounts[0].address);

    console.log("The Balance hash of BTC before mint " + AfterMint_hashBTC);

    const AfterMint_hashETH = await MockETH.balances(accounts[0].address);

    console.log("The Balance hash of ETH before mint " + AfterMint_hashETH);

    // await Factory.createPair(MockBTC.address,MockETH.address); 

    const pair = await Factory.getPair(MockETH.address,MockBTC.address);

    console.log(`The pair address that is created ${pair}`);

    const CPAMM = await ethers.getContractAt("Pair",pair);
    
    const x = await CPAMM.totalSupply();
   
    console.log("The initial supply ", x.toString());
   
    const token = await CPAMM.token0();
   
    console.log(`the token initalized is ${token}`);

    await MockBTC.approve(pair,encryptedValue);
    await MockETH.approve(pair,encryptedValue);
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
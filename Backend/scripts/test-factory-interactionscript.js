
const { ethers } = require("hardhat");

async function interactionTestfactory() {

    const MockBTC =  await ethers.getContract("BTCERC20");
    const MockETH =  await ethers.getContract("ETHERC20");
    const Factory = await ethers.getContract("Factory");
    

    console.log("The tokens have been initiated")
    
    let accounts = await ethers.getSigners()

    for (let index = 1; index < 5; index++) {
        await MockBTC.transfer(accounts[index].address,ethers.utils.parseEther("100"));
        await MockETH.transfer(accounts[index].address,ethers.utils.parseEther("100"));
        console.log("transfer made !!!!!!");
    }


   await Factory.createPair(MockBTC.address,MockETH.address);

   const pair = await Factory.getPair(MockBTC.address,MockETH.address) 

   console.log(`The pair address that is created ${pair}`);

   const CPAMM = await ethers.getContractAt("CPAMM",pair);

   const x = await CPAMM.totalSupply();
   const token = await CPAMM.token0();
   console.log(`the token initalized is ${token}`)
}

interactionTestfactory()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
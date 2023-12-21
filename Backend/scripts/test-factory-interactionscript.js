
const { ethers } = require("hardhat");

async function interactionTestfactory() {

    const MockBTC =  await ethers.getContract("BTCERC20");
    const MockETH =  await ethers.getContract("ETHERC20");
    const Factory = await ethers.getContract("Factory");
    

    console.log("The tokens have been initiated")
    
    let accounts = await ethers.getSigners()

    // for (let index = 1; index < 3; index++) {
    //     await MockBTC.transfer(accounts[index].address,ethers.utils.parseEther("100"));
    //     await MockETH.transfer(accounts[index].address,ethers.utils.parseEther("100"));
    //     console.log("transfer made !!!!!!");
    // }


   await Factory.createPair(MockBTC.address,MockETH.address);

   const pair = await Factory.getPair(MockBTC.address,MockETH.address) 

   console.log(`The pair address that is created ${pair}`);

   const CPAMM = await ethers.getContractAt("CPAMM",pair);

   const x = await CPAMM.totalSupply();
   console.log("The initail supoply ", x.toString());
   const token = await CPAMM.token0();
   console.log(`the token initalized is ${token}`);

   const xy = await MockBTC.balanceOf(accounts[0].address);
   console.log("teh balance is ", xy.toString())

   await MockBTC.connect(accounts[0]).approve(pair,ethers.utils.parseEther("5"));
   await MockETH.connect(accounts[0]).approve(pair,ethers.utils.parseEther("5"));
   await CPAMM.addLiquidity(ethers.utils.parseEther("5"),ethers.utils.parseEther("5"));

   const y = await CPAMM.totalSupply();
   console.log("The initail supoply ", y.toString());

   const beforeswap_balance_BTC = await MockBTC.balanceOf(accounts[0].address);
   console.log("teh balance is BTC before swap ", beforeswap_balance_BTC.toString());

   const beforeswap_balance_ETH = await MockETH.balanceOf(accounts[0].address);
   console.log("teh balance is ETH before swap ", beforeswap_balance_BTC.toString());

   await MockBTC.connect(accounts[0]).approve(pair,ethers.utils.parseEther("1"));
   await CPAMM.swap(MockBTC.address, ethers.utils.parseEther("1"));

   const after_balance_BTC = await MockBTC.balanceOf(accounts[0].address);
   console.log("teh balance BTC after swap is ", after_balance_BTC.toString());

   const after_balance_ETH = await MockETH.balanceOf(accounts[0].address);
   console.log("teh balance is ETH after swap ", after_balance_ETH);

   const zy = await CPAMM.totalSupply();
   console.log("The initail supoply ", zy.toString());
}

interactionTestfactory()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
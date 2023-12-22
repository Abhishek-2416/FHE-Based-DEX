
const { ethers } = require("hardhat");

async function interactionTestfactory() {

    const MockBTC =  await ethers.getContract("BTCERC20");
    const MockETH =  await ethers.getContract("ETHERC20");
    const Factory = await ethers.getContract("Factory");
    

    console.log("The tokens have been initiated");
    
    let accounts = await ethers.getSigners();

    for (let index = 1; index < 3; index++) {
        await MockBTC.transfer(accounts[index].address,ethers.utils.parseEther("100"));
        await MockETH.transfer(accounts[index].address,ethers.utils.parseEther("100"));
        console.log("transfer made !!!!!!");
    }

   await Factory.createPair(MockBTC.address,MockETH.address);

   console.log("Pair has been created");

   const pair = await Factory.getPair(MockBTC.address,MockETH.address);

   console.log(`The pair address that is created ${pair}`);

   const CPAMM = await ethers.getContractAt("CPAMM",pair);

   const x = await CPAMM.totalSupply();
   console.log("The initial supply ", x.toString());
   const token = await CPAMM.token0();
   console.log(`the token initalized is ${token}`);

   const xy = await MockBTC.balanceOf(accounts[0].address);
   console.log("the balance is ", xy.toString())

   await MockBTC.connect(accounts[0]).approve(pair,ethers.utils.parseEther("57"));
   await MockETH.connect(accounts[0]).approve(pair,ethers.utils.parseEther("59"));
   await CPAMM.addLiquidity(ethers.utils.parseEther("51"),ethers.utils.parseEther("56"));

   const y = await CPAMM.totalSupply();
   console.log("The initial supply ", y.toString());

   const beforeswap_balance_BTC = await MockBTC.balanceOf(accounts[0].address);
   console.log("the balance is BTC before swap ", beforeswap_balance_BTC.toString());

   const beforeswap_balance_ETH = await MockETH.balanceOf(accounts[0].address);
   console.log("the balance is ETH before swap ", beforeswap_balance_BTC.toString());

   await MockBTC.connect(accounts[0]).approve(pair,ethers.utils.parseEther("1"));
   await CPAMM.swap(MockBTC.address, ethers.utils.parseEther("1"));

   const after_balance_BTC = await MockBTC.balanceOf(accounts[0].address);
   console.log("the balance BTC after swap is ", after_balance_BTC.toString());

   const after_balance_ETH = await MockETH.balanceOf(accounts[0].address);
   console.log("the balance is ETH after swap ", after_balance_ETH.toString());

   const zy = await CPAMM.totalSupply();
   console.log("The initial supply ", zy.toString());

   console.log("-----------------------------------------------------------------------");

   const beforeswa_balance_BTC = await MockBTC.balanceOf(accounts[1].address);
   console.log("the balance is BTC before swap ", beforeswa_balance_BTC.toString());

   const beforeswa_balance_ETH = await MockETH.balanceOf(accounts[1].address);
   console.log("the balance is ETH before swap ", beforeswa_balance_BTC.toString());

   await MockBTC.connect(accounts[1]).approve(pair,ethers.utils.parseEther("1"));
   await CPAMM.connect(accounts[1]).swap(MockBTC.address, ethers.utils.parseEther("1"));

   const afte_balance_BTC = await MockBTC.balanceOf(accounts[1].address);
   console.log("the balance BTC after swap is ", afte_balance_BTC.toString());

   const afte_balance_ETH = await MockETH.balanceOf(accounts[1].address);
   console.log("the balance is ETH after swap ", afte_balance_ETH.toString());

   const zxy = await CPAMM.totalSupply();
   console.log("The initial supply ", zxy.toString());
}

interactionTestfactory()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
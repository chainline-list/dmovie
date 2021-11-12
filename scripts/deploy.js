
//const hre = require("hardhat");

async function main() {
  
  const NFT = await hre.ethers.getContractFactory("NFT");
  const App = await hre.ethers.getContractFactory("App")
  
  const app = await App.deploy()
  await app.deployed()

  const nft = await NFT.deploy(app.address)
  await nft.deployed()


  console.log("App deployed to:", app.address);
  console.log("NFT deployed to:", nft.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const { expect, should } = require("chai");
const { ethers } = require("hardhat");

let appAddress
let nftAddress
let appAbiDeployedContract
let nftDeployedContract
let nfts 

describe("Dmovie Token", function () {
  it("Should deploy app", async function () {
    const AppContract = await ethers.getContractFactory('App');
   const app = await AppContract.deploy();
   await app.deployed();
   appAddress = app.address
   appAbiDeployedContract = app
   should().not.equal('0')
  });


  it('Should deploy NFT token', async function() {
    const NFTContract = await ethers.getContractFactory('NFT');    
    const nft = await NFTContract.deploy(appAddress)
    await nft.deployed()
    nftAddress = nft.address
    nftDeployedContract = nft
    should().not.equal('0')
  })

  it('Should create NFT token and mint NFT', async function(){
    const [_, userAddress, userAddress2, userAddress3] = await ethers.getSigners();
    const transaction1 = await nftDeployedContract.createToken('new')
    const tx1 = await transaction1.wait()
    const transaction2 = await nftDeployedContract.createToken('new new')
    const tx2 = await transaction2.wait()
    const transaction3 = await nftDeployedContract.createToken('new new new')
    const tx3 = await transaction3.wait()
    const event1 = tx1.events[0]
    const event2 = tx2.events[0]
    const event3 = tx3.events[0]
    const token1 = event1.args[2].toNumber()
    const token2 = event2.args[2].toNumber()
    const token3 = event3.args[2].toNumber()

    expect(token1).to.equal(1)
    expect(token2).to.equal(2)
    expect(token3).to.equal(3)
    await appAbiDeployedContract.mintNFT(nftAddress,token1, ethers.utils.parseEther('1'),ethers.utils.parseEther('10'))
    await appAbiDeployedContract.mintNFT(nftAddress,token2, ethers.utils.parseEther('1'),ethers.utils.parseEther('10'))
    await appAbiDeployedContract.mintNFT(nftAddress,token3, ethers.utils.parseEther('1'),ethers.utils.parseEther('10'))
    const data = await appAbiDeployedContract.getNFTs()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await nftDeployedContract.tokenURI(i.tokenId)
      let item = {
        tokenId: i.tokenId,
        watchingFee: ethers.utils.formatUnits(i.watchingFee, 'ether'),
        price: ethers.utils.formatUnits(i.price, 'ether'),
        owner: i.owner,
        viewers: i.Viewers,
        tokenUri
      }
      return item
    }))
    expect(items).not.equal([])
    nfts = items
  })

  it('should pay watching fee', async function() {
    const [_, address] = await ethers.getSigners()
    const tx = await appAbiDeployedContract.connect(address).payAccessibility(1, {value:ethers.utils.parseEther(nfts[0].watchingFee)})
    await tx.wait()
    const data = await appAbiDeployedContract.getNFTs()
    const NFTs = await Promise.all(data.map(async i => {
      const tokenUri = await nftDeployedContract.tokenURI(i.tokenId)
      let item = {
        price: ethers.utils.formatUnits(i.price, 'ether'),
        watchingFee: ethers.utils.formatUnits(i.watchingFee, 'ether'),
        tokenId: i.tokenId,
        owner: i.owner,
        viewers: i.Viewers,
        tokenUri
      }
      return item
    }))
    expect(NFTs[0].viewers.length).to.equal(2)
  })

  it('should buy and transfer nft', async function() {
    const [_, address] = await ethers.getSigners()
    const tx = await appAbiDeployedContract.connect(address).buyNFT(nftAddress,1, {value:ethers.utils.parseEther(nfts[0].price)})
    await tx.wait()
    const data = await appAbiDeployedContract.getNFTs()
    const NFTs = await Promise.all(data.map(async i => {
      const tokenUri = await nftDeployedContract.tokenURI(i.tokenId)
      let item = {
        price: i.price,
        watchingFee: ethers.utils.formatUnits(i.watchingFee, 'ether'),
        tokenId: i.price,
        owner: i.owner,
        viewers: i.Viewers,
        tokenUri
      }
      return item
    }))
    expect(NFTs[0].owner).to.equal(address.address)
  })

  
});
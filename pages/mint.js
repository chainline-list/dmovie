import { ethers} from 'ethers'
import Web3modal from 'web3modal'
import {nftAddress,appAddress} from '../utils'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import App from '../artifacts/contracts/App.sol/App.json'


function mint() {

    const mintNft = async() => {
        const web3modal = new Web3modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer)
        const appContract = new ethers.Contract(appAddress, App.abi, signer)
        const transaction = await nftContract.createToken('http:lolo.com')
        const tx = transaction.wait()
        const event = tx.events[0] 
        const tokenId = event.args[2].toNumber() 
        await appContract.mintNFT(nftAddress, tokenId, 1, 1)
    }


    return (
        <div>
            <form>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button type="submit">Mint</button>
            </form>
        </div>
    )
}

export default mint

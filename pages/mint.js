import { ethers} from 'ethers'
import Web3modal from 'web3modal'
import {nftAddress,appAddress} from '../utils'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import App from '../artifacts/contracts/App.sol/App.json'
import router from 'next/router'
import {Web3Storage} from 'web3.storage'
import { useState } from 'react'


function mint() {

    const [file, setFile] = useState()

    const apiKey = process.env.NEXT_PUBLIC_API_TOKEN 

    const mintNft = async(e) => {
        e.preventDefault()
        console.log(file)
        const web3storage = new Web3Storage({token:apiKey})
        const cid = await web3storage.put(file)
        console.log(cid)


        /*const web3modal = new Web3modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer)
        const appContract = new ethers.Contract(appAddress, App.abi, signer)
        const transaction = await nftContract.createToken('http:lolo.com')
        const tx = await transaction.wait()
        const event = tx.events[0] 
        const tokenId = event.args[2].toNumber() 
        await appContract.mintNFT(nftAddress, tokenId, 1, 1)
        router.push('/')*/
        
    }


    return (
        <div className='mint'>

            <h2>Upload your video here !</h2>
            
            <form className='mint__form' onSubmit= {mintNft}>
                <input type="text" placeholder='Enter title ...'/>
                <textarea type="textarea" rows={4} placeholder='Enter description'/>
                <input type="number" placeholder='Enter your watching price (Optional)' />
                <input type="number" placeholder='Enter selling price'/>
                <input type="file" className="custom-video-input"/>
                <input type="file" className='custom-file-input'onChange={(e) => setFile(e.target.files)} />
                <section>
                    {file && <img src={URL.createObjectURL(file[0])} alt="" />}
                    <button type="submit">upload</button>
                </section>
                
            </form>
             <img src="" alt="" />
           
        </div>
        
    )
}

export default mint
/**/
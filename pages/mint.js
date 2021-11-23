import { ethers} from 'ethers'
import Web3modal from 'web3modal'
import {nftAddress,appAddress} from '../utils'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import App from '../artifacts/contracts/App.sol/App.json'
import router from 'next/router'
import {Web3Storage} from 'web3.storage'
import { useState } from 'react'
import {FaSpinner} from 'react-icons/fa'


function Mint() {

    const [file, setFile] = useState([])
    const [video, setVideo] = useState([])
    const [title, setTitle] = useState()
    const [description, setDescription]= useState()
    const [watchingPrice, setWatchingPrice] = useState()
    const [sellingPrice, setSellingPrice] = useState()
    const [thumbnailLink, setThumbnailLink] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const apiKey = process.env.NEXT_PUBLIC_API_TOKEN 

    const mintNft = async(e) => {
        e.preventDefault()

        setLoading(true)
        if( !title || !description  || !watchingPrice || !sellingPrice || video.length === 0 || file.length === 0 ) {
            setError('Error : Fill all the fields')
            setLoading(false)
            return
        }
        const web3storage = new Web3Storage({token:apiKey})
        try {
            const imgCID = await web3storage.put([new File([new Blob([file[0]])], `${title}`)])
            const videoCID = await web3storage.put([new File([new Blob([video[0]])], `${title}`)])
            const imgLink = `https://${imgCID}.ipfs.dweb.link/${title}`
            const videoLink = `https://${videoCID}.ipfs.dweb.link/${title}`
            const nftData = new Blob(
              [JSON.stringify({
              title,
              description,
              imgLink,
              videoLink
              })], { type:'application/json' }
            ) 
            const nftURL = await web3storage.put([new File([nftData],`${title}` )])

            const web3modal = new Web3modal()
            const connection = await web3modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer)
            const appContract = new ethers.Contract(appAddress, App.abi, signer)
            const transaction = await nftContract.createToken(`https://${nftURL}.ipfs.dweb.link/${title}`)
            const tx = await transaction.wait()
            const event = tx.events[0] 
            const tokenId = event.args[2].toNumber()
            const priceWei = ethers.utils.parseEther(`${sellingPrice}`)
            const watchingFeeWei = ethers.utils.parseEther(`${watchingPrice}`)
            await appContract.mintNFT(nftAddress, tokenId, priceWei, watchingFeeWei)
            setLoading(false)
            router.push('/')
        } catch(err) {
            setLoading(false)
        }
        
    }

    const uploadThumbnail = (e) => {
        e.preventDefault()
        const url = URL.createObjectURL(e.target.files[0])
        setThumbnailLink(url)
        setFile(e.target.files)

    }


    return (
        <div className='mint'>

            {error ? <h2 className=' error'>{error}</h2> : <h2 className='title'>Upload your video ! </h2>}
            
            <form className='mint__form' onSubmit= {mintNft} onFocus={() => setError('')}>
                <input type="text" placeholder='Enter title ...' onChange={(e) => setTitle(e.target.value)}/>
                <textarea type="textarea" rows={4} placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}/>
                <input type="number" placeholder='Enter your watching price (Optional)' onChange={(e) => setWatchingPrice(e.target.value)} />
                <input type="number" placeholder='Enter selling price' onChange={(e) => setSellingPrice(e.target.value)}/>
                <input type="file" accept='video/*' className="custom-video-input" onChange={(e) => setVideo(e.target.files)}/>
                <input type="file" accept='image/*' className='custom-file-input'onChange={uploadThumbnail} />
                {!loading && <section>
                    {thumbnailLink && <img src={thumbnailLink} alt="" />}
                    <button type="submit">upload</button>
                </section>}
                {loading && <section className='uploading'>
                    <p>Uploading... This may take several seconds </p>
                    <span className='spinner'><FaSpinner /></span> 
                </section>}
                
            </form>
             <img src="" alt="" />
           
        </div>
        
    )
}

export default Mint
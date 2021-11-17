import {ethers} from 'ethers'
import Web3modal from 'web3modal'
import App from '../../artifacts/contracts/App.sol/App.json'
import {appAddress, nftAddress} from '../../utils'
import { useSelector } from 'react-redux'
import {useRouter} from 'next/router'

function VideoScreen() {

    const router = useRouter()

    const videoData = useSelector(state => state.video)
    /*const localStorage = window.localStorage()
    localStorage.setItem('video', videoData)*/

    const buyVideo = async() => {
        const web3modal = new Web3modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const appContract = new ethers.Contract(appAddress, App.abi, signer)
        console.log(ethers.utils.parseEther(videoData.price))
        try {
            await appContract.buyNFT(nftAddress,videoData.id.toNumber(), {value: ethers.utils.parseEther(videoData.price)})
            router.push('/')
            console.log(ethers.utils.parseEther(`${videoData.price}`))
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='videoScreen'>

            <video src={videoData.srcVid} autoPlay controls={true}></video>
            <button onClick={buyVideo}>You can buy this video at {videoData.price} matic</button>

        </div>
    )
}

export default VideoScreen

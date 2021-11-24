
import {appAddress} from '../utils'
import App from '../artifacts/contracts/App.sol/App.json'
import Web3modal from 'web3modal'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'

function Card({src, title, large, description,id, srcVid, usdPrice, watchingFee,viewers, price}) {

    const router = useRouter()
    const dispatch = useDispatch()
    const payForAccessibility = async() => {
        const ethereum = window.ethereum
        const accounts = await ethereum?.request({ method: 'eth_requestAccounts' })
        const web3modal = new Web3modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const appContract = new ethers.Contract(appAddress, App.abi, signer) 
        const viewersUppercase = viewers.map(viewer => viewer.toUpperCase())
        
        if (viewersUppercase.includes(accounts[0].toUpperCase())) {
            dispatch({
                type:'setVideo',
                video: {
                    id,
                    srcVid,
                    title,
                    price, 
                    usdPrice
                }
            })
            router.push(`/video/${title}`)
            return
        }
       try {
            await appContract.payAccessibility(id.toNumber(), {value: ethers.utils.parseEther(watchingFee)})
            dispatch({
                type:'setVideo',
                video: {
                    id,
                    srcVid,
                    title,
                    price,
                    usdPrice
                }
            })
            router.push(`/video/${title}`)
        } catch(err) {
        
            console.log(err)
        }
       
    }

    return (
        <div className={`card ${large && 'large'}`}>
           <div className='thumbnail'>
                <img src={src} alt={title} />
            </div>
            <div className='description'>
                <h1>{title}</h1>
                <span>{description}</span>
            </div>
            <button className='playButton' onClick= {payForAccessibility}><img src='play.png' alt='play button'/></button>
        </div>

    )
}

export default Card
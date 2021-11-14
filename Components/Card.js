
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {appAddress} from '../utils'
import App from '../artifacts/contracts/App.sol/App.json'
import Web3modal from 'web3modal'
import { ethers } from 'ethers';

function Card({src, title, description,id, srcVid, watchingFee, price}) {

    const payForAccessibility = async() => {
        const web3modal = new Web3modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = await provider.getSigner()
        const appContract = new ethers.Contract(appAddress, App.abi, signer)
        try {
            await appContract.payAccessibility(id.toNumber())
            console.log('accessibility paid')
        } catch(err) {
            console.log(err)
        }
       
    }

    return (
        <div className='card'>
            <div className='thumbnail'>
                <img src={src} alt={title} />
            </div>
            <div className='description'>
                <h1>{title}</h1>
                <span>{description}</span>
            </div>
            <button className='playButton' onClick= {payForAccessibility}><PlayCircleOutlineIcon/></button>
        </div>

    )
}

export default Card
import Head from 'next/head'
import {ethers} from 'ethers'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import App from '../artifacts/contracts/App.sol/App.json'
import { useEffect, useState } from 'react'
import {nftAddress, appAddress} from '../utils'
import Card from '../Components/Card'
import axios from 'axios'
import Loading from '../Components/Loading'
import Caroussel from '../Components/Caroussel'

export default function Home() {
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const getBlockChainData = async () => {

    const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
    const tokenContract = new ethers.Contract(nftAddress,NFT.abi, provider)
    const appContract = new ethers.Contract(appAddress,App.abi, provider)
  
    
    try {
      const data = await appContract.getNFTs()
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const metadata = meta.data
        const nftId = i.itemId 
        const usdPrice = ethers.utils.formatUnits(i.usdPrice, 'ether')
        const watchingFee =ethers.utils.formatUnits(i.watchingFee, 'ether') 
        const price = ethers.utils.formatUnits(i.price, 'ether')
        const viewers = i.Viewers 
        const nft = {
          nftId,
          watchingFee,
          price,
          usdPrice,
          metadata,
          viewers
        }
        return nft
      }))
      setItems(items)
      setLoading(false)
    } catch(err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getBlockChainData()
  }, [])


  const carouselArray = [items[0], items[1], items[2], items[3], items[4]]
  

  return (
    <div className='app'>
      <Head>
        <title>Dmovie</title>
        <meta name="description" content="Decentralized movie watching platform built on polygon" />
        <link rel="icon" href="/phonto.ico" />
      </Head>

      {!loading && <main className='app__content'>

        <Caroussel elements ={carouselArray}/>

        <div className="items">
          {items?.map(({nftId, watchingFee, price, usdPrice, viewers, metadata}) => <Card key={nftId} id={nftId} src = {metadata.imgLink} title={metadata.title} description={metadata.description} srcVid={metadata.videoLink} usdPrice={usdPrice} watchingFee={watchingFee} price={price} viewers={viewers}/>)}
        </div>

        
        
      </main>}

      {
        loading && <div className="loadingApp">
          <Loading/>
          <Loading/>
          <Loading/>
          <Loading/>
        </div>
      }



    </div>

     
  )
}

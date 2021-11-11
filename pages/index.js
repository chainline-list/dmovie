import Head from 'next/head'
import {ethers} from 'ethers'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import App from '../artifacts/contracts/App.sol/App.json'
import { useEffect, useState } from 'react'
import {nftAddress, appAddress} from '../utils'
import Link from 'next/link'
import identicon from 'identicon'
import Web3modal from 'web3modal'
import {Web3Storage} from 'web3.storage'
import Card from '../Components/Card'
import axios from 'axios'

export default function Home() {
  
  const [account, setAccount] = useState('')
  const [items, setItems] = useState([])
  /*const web3modal = new Web3modal()
  const Provider = web3modal.connect()
  Provider.on("accountsChanged", (accounts) => {
    console.log(accounts);
  });*/


  const getBlockChainData = async () => {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftAddress,NFT.abi, provider)
    const appContract = new ethers.Contract(appAddress,App.abi, provider)
    const storage = new Web3Storage({token: process.env.NEXT_PUBLIC_API_TOKEN})
    
    try {
      const data = await appContract.getNFTs()
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const nft = meta.data
        return nft
      }))
      setItems(items)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBlockChainData()
  }, [])

  

  return (
    <div className='app'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='app__content'>

        {items.map(({title, description, imgLink, videoLink}) => <Card key={description} src = {imgLink} title={title} description={description} srcVid={videoLink}/>)}
        
      </main>

      <section className='app__addButton'><Link href='/mint'>kk</Link></section>



    </div>

     
  )
}

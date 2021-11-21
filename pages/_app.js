import '../styles/globals.css'
import '../styles/Home.css'
import '../styles/Card.css'
import '../styles/Mint.css'
import NavBar from '../Components/NavBar'
import store from '../store'
import {Provider} from 'react-redux'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  
  const [wallet, setWallet] = useState(true)

  const checkWallet = () => {
    if (window.ethereum === 'undefined') {
      setWallet(false)
    }
  }

  useEffect(() => {
    checkWallet()
  }, [])


  return (
    <>
     <NavBar/>
     {wallet && <Provider store={store}><Component {...pageProps} /></Provider>}
     {!wallet && <div>Please install a wallet</div>}
   
    
    </>
  )
  
}

export default MyApp

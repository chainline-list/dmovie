import '../styles/globals.css'
import '../styles/Home.css'
import '../styles/Card.css'
import '../styles/Mint.css'
import NavBar from '../Components/NavBar'
import store from '../store'
import {Provider} from 'react-redux'

function MyApp({ Component, pageProps }) {


  return (
    <>
    <NavBar/>
    {
      window.ethereum !== 'undefined' ? <Provider store={store}><Component {...pageProps} /></Provider> : <div>Please install a wallet</div>
    }
    
    </>
  )
  
}

export default MyApp

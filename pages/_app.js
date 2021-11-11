import '../styles/globals.css'
import '../styles/Home.css'
import '../styles/Card.css'
import '../styles/Mint.css'
import NavBar from '../Components/NavBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <NavBar/>
    <Component {...pageProps} />
    </>
  )
  
}

export default MyApp

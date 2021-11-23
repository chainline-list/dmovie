import { useEffect, useState } from "react";
import Identicon from 'identicon.js'
import Link from 'next/link'


function NavBar() {

    const [buffer, setBuffer] = useState()

    const requestAccount = async () => {
        const ethereum = window.ethereum 
        if (ethereum !== 'undefined') {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const data = new Identicon(`${accounts[0]}`, 420).toString();
          setBuffer(data)
        }
    }

    useEffect(() => {
        requestAccount()
    }, [])
    
    

    return (
        <nav>
          <section className='logo'><Link href='/'><img src='phonto.PNG'/></Link> <h1>Dmovie</h1></section>
          <section className='nav__rightSide'>
            <span><Link href='/mint'>Upload</Link></span>
            <img width={40} height={40} src={`data:image/png;base64,${buffer ? buffer : '0'}`}/>
          </section>
       </nav>
    )
}

export default NavBar
//<img src={Buffer} alt="" />
import { useEffect, useState } from "react";
//import identicon from 'identicon'
import Link from 'next/link'


function NavBar() {

    const [Buffer, setBuffer] = useState()

    const requestAccount = async () => {
        const ethereum = window.ethereum 
        if (ethereum !== 'undefined') {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          //console.log(accounts[0])
          identicon.generate({id:accounts[0], size:30}, (err , buffer) => {
            setBuffer(buffer)
          })
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
            
          </section>
       </nav>
    )
}

export default NavBar
//<img src={Buffer} alt="" />
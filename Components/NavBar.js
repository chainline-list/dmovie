import { useEffect, useState } from "react";
import identicon from 'identicon'


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
          <section>Dmovie</section>
          <section><img src={Buffer} alt="" /></section>
       </nav>
    )
}

export default NavBar

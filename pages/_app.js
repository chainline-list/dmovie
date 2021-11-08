import '../styles/globals.css'
import '../styles/Home.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <nav>
      <section>Name</section>
      <section>cartoon</section>
    </nav>
    <Component {...pageProps} />
    </>
  )
  
}

export default MyApp

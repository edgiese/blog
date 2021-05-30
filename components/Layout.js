import Head from 'next/head'
import Header from './Header'
import Menu from './Menu'
import Aside from './Aside'
import Footer from './Footer'
// noinspection ES6UnusedImports
import styles from 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout({ children, pageTitle, description, setup_comments=false }) {
    // noinspection CheckTagEmptyBody
    const comment_setup = setup_comments ? (
        <>
            <div id="fb-root"></div>
            <script async defer crossOrigin="anonymous" src={process.env.FB_SRC} nonce={process.env.FB_NONCE}></script>
        </>
    ) : (<></>);
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>
            {comment_setup}
            <div id="container">
                <Header title={pageTitle} description={description} />
                <Menu />
                {children}
                <Aside />
                <Footer />
            </div>
        </>
    )
}
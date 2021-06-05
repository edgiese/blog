import Head from 'next/head'
import Header from './Header'
import Menu from './Menu'
import Aside from './Aside'
import Footer from './Footer'
// noinspection ES6UnusedImports
import styles from 'bootstrap/dist/css/bootstrap.min.css'
import process from "process";

export default function Layout({ children, pageTitle, description, setup_comments=false }) {
    if (typeof window !== 'undefined' && setup_comments) {
        let d = window.document
        let id='facebook-jssdk'
        const fjs = d.getElementsByTagName('script')[0];
        if (!d.getElementById(id)) {
            const js = d.createElement('script')
            js.id = id
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=337417164702775&autoLogAppEvents=1'
            js.nonce = 'vQTDnsLQ'
            window.ed_js=js
            fjs.parentNode.insertBefore(js, fjs);
            window.FB.XFBML.parse();
        }
    }
    // noinspection CheckTagEmptyBody
    /*
    const comment_setup = setup_comments ? (
        <>
            <div id="fb-root"></div>
            <script async defer crossOrigin="anonymous" src={process.env.FB_SRC} nonce={process.env.FB_NONCE}></script>
        </>
    ) : (<></>);
    */
    const comment_setup = (<></>)
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
import Head from 'next/head'
import Header from './Header'
import Menu from './Menu'
import Aside from './Aside'
import Footer from './Footer'
// noinspection ES6UnusedImports
import styles from 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

export default function Layout({ children, pageTitle, description }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>
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
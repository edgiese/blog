import Head from 'next/head'
import Header from './Header'
import Meta from './Meta'
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
            <section className="layout">
                <Container><Row><Col>
                    <Header title={pageTitle} description={description} />
                </Col></Row></Container>
                <Container><Row>
                    <Col xs={9} className="content">{children}</Col>
                    <Col xs={3}><Meta /></Col>
                </Row></Container>
                <Container><Row><Col>
                    <Footer />
                </Col></Row></Container>
            </section>

        </>
    )
}
import Head from 'next/head'
import Header from './Header'
import Meta from './Meta'
import { Container, Row, Col } from 'react-bootstrap'
import styles from 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout({ children, pageTitle, description, ...props }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{pageTitle}</title>
            </Head>
            <section className="layout">
                <Container Fluid><Row><Col>
                    <Header title={pageTitle} description={description} />
                </Col></Row></Container>
                <Container><Row>
                    <Col className="content">{children}</Col>
                    <Col xs={3}><Meta /></Col>
                </Row></Container>
                <Container Fluid><Row><Col>
                    <footer>Built by me!</footer>
                </Col></Row></Container>
            </section>
        </>
    )
}
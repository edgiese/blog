import MarkDown from 'react-markdown'
import Layout from "../components/Layout";

const About = ({ title, description, about_body_md, ...props }) => {
    const children = (
        <>
        <main><article>
            <MarkDown children={about_body_md} />
        </article></main>
        </>
    )
    return (
        <Layout children={children} pageTitle={title} description={description} />
    )
}

export default About

export async function getStaticProps() {
    const configData = await import(`../siteconfig.json`)
    const fs = require('fs')
    const about_body_md = fs.readFileSync('pages/about.md', 'utf8')
    return {
        props: {
            title: configData.default.title,
            description: configData.default.description,
            "about_body_md": about_body_md
        },
    }
}
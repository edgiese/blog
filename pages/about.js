import MarkDown from 'react-markdown'

const About = ({ title, description, about_body_md, ...props }) => {
    return (
        <>
            <MarkDown children={about_body_md} />
        </>
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
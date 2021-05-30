import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import {getPages} from "../../packages/util1";

import Layout from '../../components/Layout'

export default function BlogPage({ siteTitle, markdownBody, frontmatter }) {

    const children = (!frontmatter) ? (
        <main>
            <article>
                <ReactMarkdown source={markdownBody} />
            </article>
        </main>
    ) : (
        <main>
            <article>
                <h1>{frontmatter.title}</h1>
                <ReactMarkdown source={markdownBody} />
            </article>
        </main>
    )

    return (
        <Layout children={children} pageTitle={siteTitle}>
        </Layout>
    )
}

export async function getStaticProps({ ...ctx }) {
    const { pagename } = ctx.params

    const content = await import(`../../page_entries/${pagename}.md`)
    const config = await import(`../../siteconfig.json`)
    const data = matter(content.default)

    return {
        props: {
            siteTitle: config.title,
            markdownBody: data.content,
            frontmatter: data.data,
        },
    }
}

export async function getStaticPaths() {
    const paths = getPages().map((page) => `/page/${page.slug}`)
    return {
        paths,
        fallback: false,
    }
}
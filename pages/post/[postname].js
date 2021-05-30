import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import getPosts from "../../packages/util1";

import Layout from '../../components/Layout'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
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
                <p className={"description"}>Posted on {frontmatter.published} in {frontmatter.category}</p>
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
    const { postname } = ctx.params

    const content = await import(`../../posts/${postname}.md`)
    const config = await import(`../../siteconfig.json`)
    const data = matter(content.default)

    return {
        props: {
            siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    }
}

export async function getStaticPaths() {
    const paths = getPosts().map((post) => `/post/${post.slug}`)
    return {
        paths,
        fallback: false,
    }
}
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import getPosts from "../../packages/util1";

import Layout from '../../components/Layout'

export default function BlogPost({ siteTitle, frontmatter, markdownBody, postname }) {
    const my_href = "https://edgiese.com" + "/post/" + postname;
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
                <div>
                    <ReactMarkdown source={markdownBody} allowDangerousHtml />
                </div>
                <div className="fb-comments" data-href={my_href} data-width="80%" data-numposts="5"/>
            </article>
        </main>
    )

    return (
        <Layout children={children} pageTitle={siteTitle} setup_comments={true} >
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
            postname: postname
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
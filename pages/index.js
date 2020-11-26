import Layout from '../components/Layout'
import RecentPosts from "../components/RecentPosts";
import getPosts from "../packages/util1"
import matter from "gray-matter";

const Index = ({ posts, title, description, ...props }) => {
    const children = (
        <main>
            <RecentPosts posts={posts}/>
        </main>
    )
    return (
        <Layout children={children} pageTitle={title} description={description} />
    )
}
export default Index

export async function getStaticProps() {
    const configData = await import(`../siteconfig.json`)
    const posts = getPosts()

    // HERE IS WHERE YOU PROBABLY WANT TO SORT AND TRIM THE POSTS

    const content = await Promise.all(posts.map(async p => {
        const c = await import(`../../posts/${p.slug}.md`)
        return Object.assign({content: c}, p)
    }))

    const posts_plus = content.map(post => {
        const data = matter(post.content.default);
        return Object.assign({
            frontmatter: data.data,
            markdownBody: data.content,
        }, post)
    })

    return {
        props: {
            posts: posts_plus,
            title: configData.default.title,
            description: configData.default.description,
        },
    }
}


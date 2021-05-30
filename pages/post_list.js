import Layout from '../components/Layout'
import getPosts from "../packages/util1"
import PostList from "../components/PostList";

const PostTOC = ({ posts, title, description }) => {
    const children = (
        <main>
            <p>I plan to improve this list by making it a sortable, filterable table with synopses, dates, and categories.  This will also be where <strong>search</strong> gets done.</p>
            <PostList posts={posts}/>
        </main>
    )
    return (
        <Layout children={children} pageTitle={title} description={description} />
    )
}
export default PostTOC

export async function getStaticProps() {
    const configData = await import(`../siteconfig.json`)
    const posts = getPosts()

    return {
        props: {
            posts: posts,
            title: configData.default.title,
            description: configData.default.description,
        },
    }
}


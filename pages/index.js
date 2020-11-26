import Layout from '../components/Layout'
import PostList from "../components/PostList";
import getPosts from "../packages/util1"

const Index = ({ posts, title, description, ...props }) => {
    const children = (
        <main>
            <PostList posts={posts}/>
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

    return {
        props: {
            posts,
            title: configData.default.title,
            description: configData.default.description,
        },
    }
}


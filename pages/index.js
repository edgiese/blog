import Layout from '../components/Layout'
import RecentPosts from "../components/RecentPosts";
import getPosts from "../packages/util1"

const Index = ({ posts, title, description }) => {
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

    return {
        props: {
            posts: posts,
            title: configData.default.title,
            description: configData.default.description,
        },
    }
}


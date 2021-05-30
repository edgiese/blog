import ReactMarkdown from "react-markdown";

export default function RecentPosts({ posts }) {
    if (posts === 'undefined') return null
    return (
        <div>
            {!posts && <div>No posts!</div>}
            <div>
                {posts &&
                posts.map(post => {
                    return (
                        <article key={post.slug}>
                            <h1>{post.frontmatter.title}</h1>
                            <p className={"description"}>Posted on {post.frontmatter.published} in {post.frontmatter.category}</p>
                            <div>
                                <ReactMarkdown source={post.markdownBody} allowDangerousHtml />
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}



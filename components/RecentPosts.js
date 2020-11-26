import ReactMarkdown from "react-markdown";

export default function RecentPosts({ posts }) {
    if (posts === 'undefined') return null
    return (
        <div>
            {!posts && <div>No posts!</div>}
            <div>
                {posts &&
                posts.map((post) => {
                    return (
                        <article key={post.slug}>
                            <h2>{post.frontmatter.title}</h2>
                            <div>
                                <ReactMarkdown source={post.markdownBody} />
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}



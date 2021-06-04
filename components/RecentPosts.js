import ReactMarkdown from "react-markdown";

export default function RecentPosts({ posts }) {
    if (posts === 'undefined') return null
    return (
        <div>
            {!posts && <div>No posts!</div>}
            <div>
                {posts && posts.map(post => {
                    const my_href = "https://edgiese.com" + "/post/" + post.slug;
                    return (
                        <article key={post.slug}>
                            <h1>{post.frontmatter.title}</h1>
                            <p className={"description"}>Posted on {post.frontmatter.published} in {post.frontmatter.category}</p>
                            <div>
                                <ReactMarkdown source={post.markdownBody} allowDangerousHtml />
                            </div>
                            <div className="fb-comments" data-href={my_href} data-width="80%" data-numposts="5"/>
                        </article>
                    )
                })}
            </div>
            <p><a href={"/post_list"}>... View list of all posts</a></p>
        </div>
    )
}



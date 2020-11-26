import Link from 'next/link'
import matter from "gray-matter";
import getPosts from "../packages/util1";
import ReactMarkdown from "react-markdown";
import Layout from "./Layout";

export default function RecentPosts({ posts }) {
    if (posts === 'undefined') return null
    return (
        <div>
            {!posts && <div>No posts!</div>}
            <div>
                {posts &&
                posts.map((post) => {
                    return (
                        <article>
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



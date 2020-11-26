import matter from "gray-matter";

export default function getPosts() {
    const context = require.context('../posts', true, /\.md$/)
    const keys = context.keys()
    const values = keys.map(context)

    // noinspection UnnecessaryLocalVariableJS
    const posts = keys.map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        const value = values[index]
        const document = matter(value.default)
        return {
            frontmatter: document.data,
            markdownBody: document.content,
            slug,
        }
    })

    // HERE IS WHERE YOU PROBABLY WANT TO SORT AND TRIM THE POSTS
    return posts;
}

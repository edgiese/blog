import matter from "gray-matter";

export default function getPosts(num_to_return) {
    const context = require.context('../posts', true, /\.md$/)
    const keys = context.keys()
    const values = keys.map(context)

    const posts = keys.map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        const value = values[index]
        const document = matter(value.default)
        return {
            frontmatter: document.data,
            markdownBody: document.content,
            slug,
        }
    }).sort((a, b) => {
        // sort from greater to lesser
        if (a.frontmatter.published > b.frontmatter.published)
            return -1;
        else if (a.frontmatter.published < b.frontmatter.published)
            return 1
        return 0;
    })

    if (typeof(num_to_return) != 'number' || num_to_return === 0)
        return posts;

    if (num_to_return > 0) {
        // positive value - return number of requested posts, or all of them
        if (posts.length > num_to_return)
            posts.length = num_to_return;
        return posts.slice(0, num_to_return)
    }

    // value is negative - return everything after the requested posts
    const num_to_skip = -num_to_return;
    if (num_to_skip >= posts.length)
        return [];
    posts.splice(0, num_to_skip);
    return posts;
}

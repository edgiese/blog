import react from 'react'
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown'
import ReactDOMServer from 'react-dom/server'

export function getPosts() {
    const context = require.context('../posts', true, /\.md$/)
    const keys = context.keys()
    const values = keys.map(context)

    return keys.map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        const value = values[index]
        const document = matter(value.default)
        return {
            frontmatter: document.data,
            markdownBody: document.content,
            slug,
        }
    })
}

export default class Rss extends react.Component {
    static async getInitialProps({ res }) {
        if (!res) {
            return;
        }
        const configData = await import(`../siteconfig.json`)
        const blogPosts = getPosts();
        /*
        const blogPosts = ((context) => {
            const keys = context.keys()
            const values = keys.map(context)

            const data = keys.map((key, index) => {
                let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
                const value = values[index]
                const document = matter(value.default)
                return {
                    frontmatter: document.data,
                    markdownBody: document.content,
                    slug,
                }
            })
            return data
        })(require.context('../posts', true, /\.md$/))
         */
        res.setHeader("Content-Type", "text/xml");
        res.write(getRssXml(blogPosts, configData.default.title, configData.default.description));
        res.end();
    }
}

const getRssXml = (blogPosts, title, shortSiteDescription) => {
    const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
    return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>${title}</title>
        <link>https://edgiese.com</link>
        <description>${shortSiteDescription}</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const blogPostsRssXml = (blogPosts) => {
    let latestPostDate = "";
    let rssItemsXml = "";
    blogPosts.forEach(post => {
        const postDate = Date.parse(post.frontmatter.latestPostDate);
        const body = ReactDOMServer.renderToString(<ReactMarkdown children={post.markdownBody} />)
        if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
            latestPostDate = post.frontmatter.latestPostDate;
        }
        rssItemsXml += `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>
          http://edgiese.com/posts/${post.frontmatter.slug}
        </link>

        <pubDate>${post.frontmatter.published}</pubDate>
        <description>
                   <![CDATA[${body}]]>
        </description>
    </item>`;
    });
    return {
        rssItemsXml,
        latestPostDate
    };
};
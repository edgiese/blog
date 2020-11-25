import react from 'react'
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown'
import ReactDOMServer from 'react-dom/server'
import moment from 'moment'

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

function rfc822(mydate) {
    return moment(mydate).format('ddd, DD MMM YYYY HH:mm:ss Z')
}

const getRssXml = (blogPosts, title, shortSiteDescription) => {
    const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
    const lpdString = rfc822(latestPostDate)
    return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>${title}</title>
        <link>https://edgiese.com</link>
        <description>${shortSiteDescription}</description>
        <language>en</language>
        <lastBuildDate>${lpdString}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const blogPostsRssXml = (blogPosts) => {
    let latestPostDate = "";
    let rssItemsXml = "";
    blogPosts.forEach(post => {
        const postDate = moment(post.frontmatter.published, 'YYYY-MM-DD hh:mm:ss').toDate();
        const pd = rfc822(postDate)
        const body = ReactDOMServer.renderToString(<ReactMarkdown children={post.markdownBody} />)
        if (!latestPostDate || postDate > latestPostDate) {
            latestPostDate = postDate
        }
        rssItemsXml += `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>
          http://edgiese.com/posts/${post.frontmatter.slug}
        </link>

        <pubDate>${pd}</pubDate>
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
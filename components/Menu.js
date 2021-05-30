import Link from 'next/link'

export default function Menu() {
    // noinspection HtmlUnknownTarget
    return (
        <>
            <nav>
                <input type={"checkbox"} id={"menu"} /><p className={"menu_line"}><label htmlFor={"menu"}>&nbsp;</label></p>
                <ul>
                    <li><Link href="/post_list"><a>Search</a></Link></li>
                    <li><Link href="/post_list"><a>Post List</a></Link></li>
                    <li><Link href="/about"><a>About</a></Link></li>
                    <li><Link href="/page/subscribe"><a>Subscribe</a></Link></li>
                </ul>
            </nav>
        </>
    )
}

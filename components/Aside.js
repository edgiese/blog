import Link from 'next/link'

export default function Aside() {
    // noinspection HtmlUnknownTarget
    return (
        <>
            <aside>
                <h2>Blog Roll</h2>
                <ul>
                    <li><Link href="http://brokenchainsblog.com"><a>Broken Chains</a></Link></li>
                    <li><Link href="http://goodlifeodyssey.com"><a>Good Life Odyssey</a></Link></li>
                </ul>
            </aside>
        </>
    )
}

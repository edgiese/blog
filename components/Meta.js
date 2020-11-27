import Link from 'next/link'

export default function Meta() {
    // noinspection HtmlUnknownTarget
    return (
        <>
            <div className="meta">
                <h2>Meta</h2>
                <nav className="nav">
                    <Link href="/about">
                        <a>About this Web Log</a>
                    </Link>
                </nav>
                <br />
                <h2>Blog Roll</h2>
                <nav className="nav">
                    <Link href="http://brokenchainsblog.com">
                        <a>Broken Chains</a>
                    </Link>
                </nav>
                <nav className="nav">
                    <Link href="http://goodlifeodyssey.com">
                        <a>Good Life Odyssey</a>
                    </Link>
                </nav>
            </div>
        </>
    )
}

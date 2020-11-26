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
            </div>
        </>
    )
}

import Link from 'next/link'

export default function Meta({title, description, ...props}) {
    return (
        <>
            <div className="meta">
                <h2>Meta</h2>
                <nav className="nav">
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </nav>
            </div>
        </>
    )
}

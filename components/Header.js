
export default function Header({title, description}) {
    return (
        <>
            <header className="header">
                <h1 className="blogtitle">
                    <a href="/">{title}</a>
                </h1>
                <p className="description">
                    {description}
                </p>
            </header>
        </>
    )
}
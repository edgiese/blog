
export default function Header({title, description, ...props}) {
    return (
        <>
            <header className="header">
                <h1>
                    <a href="/">{title}</a>
                </h1>
                <p className="description">
                    {description}
                </p>
            </header>
        </>
    )
}
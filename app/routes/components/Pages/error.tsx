import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <div className="Layout min-h-screen w-screen flex flex-col justify-center">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">404 page</h1>
                        <p className="py-6">offline :(</p>
                        <Link to="/">
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

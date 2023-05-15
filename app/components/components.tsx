import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

const Container = (props: PropsWithChildren) => {
    return <div className="text-center flex flex-col gap-5">{props.children}</div>
}

export const Home = () => {
    return (
        <Container>
            <h1 className="text-3xl text-white">Home Page</h1>
            <Link to="/about">
                <button className="px-3 py-2 rounded-md bg-slate-600 text-white">Switch Page</button>
            </Link>
        </Container>
    )
}

export const About = () => {
    return (
        <Container>
            <h1 className="text-3xl text-white">About Page</h1>
            <Link to="/">
                <button className="px-3 py-2 rounded-md bg-slate-600 text-white">Switch Page</button>
            </Link>
        </Container>
    )
}

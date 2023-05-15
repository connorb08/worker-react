import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'

const Hero = () => {
    const [message, setMessage] = useState<string>('no res yet')
    const messageColor = 'text-green-600'

    useEffect(() => {
        fetch('/api')
            .then(async (res) => {
                const text = await res.text()
                console.log(text)
                try {
                    const data = await JSON.parse(text)
                    setMessage(data.message)
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    })

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">connorbray.net</h1>
                    <p className="py-6">
                        Progressive React App. Hosted on Cloudflare Workers. Leverages service workers to provide
                        offline functionality. Api message:
                        <br />
                        <span className={messageColor}>{message}</span>
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

const Root = () => {
    return (
        <>
            <Hero />
            <div className="min-h-screen">
                <Outlet />
            </div>
        </>
    )
}

export default Root

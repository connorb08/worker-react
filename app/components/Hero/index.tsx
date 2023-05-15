import { useEffect, useState } from 'react'

const Hero = () => {
    const [message, setMessage] = useState<string>('no res yet')

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
        <div className="text-center min-h-screen flex flex-col justify-center">
            <div className="text-white flex flex-col gap-4">
                <span>
                    <h1 className="text-6xl text-sky-300 font-bold">connorbray.net</h1>
                    <h2 className="text-4xl">Beta Site</h2>
                </span>

                <p>Progressive React App built on Cloudflare Workers</p>

                <p>Api message: {message}</p>
            </div>
        </div>
    )
}

export default Hero

import { useState } from 'react'
import { Outlet } from 'react-router'
import { IoIosClose, IoIosRefresh } from 'react-icons/io'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { useLocalStorage } from '../utils/hooks'

interface messagePopup {
    open: boolean
    message: string
}

interface apiData {
    ok: boolean
    message: string
}

interface HeroProps {
    heroOpen: boolean
    setHeroOpen: (state: boolean) => void
}

const Hero = ({ heroOpen, setHeroOpen }: HeroProps) => {
    const [api, setApi] = useState<apiData>({ ok: false, message: 'waiting on data...' })
    const [popup, setPopup] = useLocalStorage<messagePopup>('popupState', {
        open: false,
        message: '',
    })
    const messageColor = api.ok ? 'text-accent' : 'text-secondary'
    const setError = (error: string) => {
        setPopup({ open: true, message: error })
    }

    const checkApi = () => {
        fetch('/api')
            .then(async (res) => {
                res.json<apiData>()
                    .then((data) => {
                        setApi({ ...data })
                    })
                    .catch((error) => {
                        console.log(error)
                        setApi({ ok: false, message: 'Error parsing request 🤖' })
                    })
            })
            .catch((error) => {
                console.log(error)
                setApi({ ok: false, message: 'Error fetching data ...' })
            })
    }

    return heroOpen ? (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">connorbray.net</h1>
                    <h1 className="text-4xl font-bold text-accent pt-2">beta</h1>
                    <p className="py-6">
                        Progressive React App. Hosted on Cloudflare Workers. Leverages service workers to provide
                        offline functionality. Api message:
                        <br />
                        <span className={messageColor}>{api.message}</span>
                    </p>
                    <div className="flex flex-row justify-center">
                        <div className="flex flex-row gap-3">
                            <button className="btn btn-primary" onClick={() => setHeroOpen(false)}>
                                Get Started
                            </button>
                            <button
                                className="rounded-full bg-primary text-neutral-100 hover:bg-accent p-3"
                                onClick={checkApi}
                            >
                                <IoIosRefresh size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {popup.open ? (
                <div className="toast toast-end p-0 px-3 mb-5 mr-5">
                    <div className="alert bg-primary">
                        <span>
                            <span className="font-bold text-white">{popup.message}</span>
                            <button
                                className="rounded-full bg-primary text-neutral-100 hover:bg-accent"
                                onClick={() => setPopup({ ...popup, open: false })}
                            >
                                <IoIosClose size={24} />
                            </button>
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    ) : null
}

const Root = () => {
    const [displayHero, setDsplayHero] = useState<boolean>(true)

    return (
        <>
            <Hero heroOpen={displayHero} setHeroOpen={setDsplayHero} />

            <div>
                <Navbar openHero={() => setDsplayHero(true)} />
                <div className="min-h-screen flex flex-col">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Root

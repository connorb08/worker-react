import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Hero from '../Hero'

const Layout = () => {
    const [pageOpen, setPageOpen] = useState<boolean>(false)
    const togglePage = () => setPageOpen(!pageOpen)

    return (
        <div className="Layout min-h-screen w-screen flex flex-col justify-center">
            <div>{pageOpen ? <Outlet /> : <Hero />}</div>

            <div className="flex justify-center">
                <button
                    id="PageController"
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded absolute z-20 bottom-3"
                    onClick={togglePage}
                >
                    Toggle Page
                </button>
            </div>
        </div>
    )
}

export default Layout

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { startTransition, StrictMode } from 'react'

const hydrate = async () => {
    const router = createBrowserRouter(routes)
    const root = document.getElementById('root') || document

    startTransition(() => {
        ReactDOM.hydrateRoot(
            root,
            <StrictMode>
                <RouterProvider router={router} fallbackElement={null} />
            </StrictMode>
        )
    })
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate)
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(hydrate, 1)
}

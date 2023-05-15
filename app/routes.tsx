import type { RouteObject } from 'react-router-dom'
import { About } from './components/components'
import { Home } from './components/components'
import Layout from './components/Layout'
import { ErrorPage } from './components/Pages/error'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ],
        errorElement: <ErrorPage />,
    },
    {
        path: '/offline',
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
    },
]

export default routes

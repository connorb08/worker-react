import type { RouteObject } from 'react-router-dom'
import { About } from './components/components'
import { Home } from './components/components'
import Layout from './components/Layout'

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
    },
]

export default routes

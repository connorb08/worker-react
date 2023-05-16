import type { RouteObject } from 'react-router-dom'
import { About } from './components/components'
import { Home } from './components/components'
import Root from './root'
import { ErrorPage } from './components/Pages/error'
import ResumeCreator from './components/ResumeCreator'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Root />,
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
        path: '/resume',
        element: <ResumeCreator />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/offline',
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
    },
]

export default routes

import type { PropsWithChildren } from 'react'
import type { StaticHandlerContext } from 'react-router-dom/server'
import { StaticRouterProvider } from 'react-router-dom/server'

const Scripts = () => {
    // @ts-expect-error : __SCRIPT_FILES is a macro to include build file names
    const scripts: string[] = __SCRIPT_FILES.split('_|_') as string[]
    return (
        <>
            {scripts.map((script, index) => {
                return <script src={script} key={index} async />
            })}
        </>
    )
}

const Document = (props: PropsWithChildren) => {
    const NOCACHE = process.env.NODE_ENV === 'development' && false
    const className = 'bg-base-200 font-mono overscroll-none'
    // @ts-expect-error : __TAILWIND_SCRIPT is a macro to include build file names
    const tailwind_script = __TAILWIND_SCRIPT as string
    return (
        <html lang="en">
            <head>
                <title>Edge React App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Beta version of connorbray.net" />
                <link href={tailwind_script} rel="stylesheet" />
            </head>
            <body className={`${className}`}>
                <div id="root">{props.children}</div>
                <Scripts />
            </body>
        </html>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = (props: PropsWithChildren<{ router: any; context: StaticHandlerContext }>) => {
    return (
        <Document>
            <StaticRouterProvider router={props.router} context={props.context} />
        </Document>
    )
}

export default App

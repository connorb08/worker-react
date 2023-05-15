import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import routes from './routes/routes'
import App from './root'

export default async function handleRequest(request: Request) {
    let responseStatusCode = 200
    const responseHeaders: Headers = {} as Headers

    const handler = createStaticHandler(routes)
    const context = await handler.query(request)

    // Return redirect response if context is a redirect
    if (context instanceof Response && [301, 302, 303, 307, 308].includes(context.status)) {
        const location = context.headers.get('Location') || '/'
        return Response.redirect(location, context.status)
    } else if (context instanceof Response) {
        return context
    }

    const router = createStaticRouter(handler.dataRoutes, context)

    const body = await renderToReadableStream(
        <React.StrictMode>
            <App router={router} context={context} />
        </React.StrictMode>,
        {
            onError: (error) => {
                responseStatusCode = 500
                console.error(error)
            },
            signal: request.signal,
        }
    )

    const headers = new Headers(responseHeaders)
    headers.set('Content-Type', 'text/html')

    return new Response(body, {
        status: responseStatusCode,
        headers,
    })
}

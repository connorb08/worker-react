import { handleAsset, handleRequest } from './handler'

const worker: ExportedHandler<Env> = {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        try {
            const url = new URL(request.url)
            const path = url.pathname

            if (path.startsWith('/api')) {
                const clone = new Request(`https://api.connorbray.net/${path.slice(4)}`, request.clone())
                return await env.connorbrayapi.fetch(clone, env, ctx)
            }
            // else if (path.startsWith('/offline')) {
            //     url.pathname = '/offline.html'
            //     const clone = new Request(url, request.clone())
            //     console.log(clone.url)
            //     return await handleAsset(clone, env, ctx)
            //     // // const body = JSON.stringify({ message: 'Site is offline!' })
            //     // const html = `<!DOCTYPE html>
            //     //                     <body>
            //     //                     <h1>Offline response</h1>
            //     //                     <p>Offline page</p>
            //     //                     </body>`
            //     // return new Response(html, {
            //     //     headers: {
            //     //         'content-type': 'text/html;charset=UTF-8',
            //     //     },
            //     // })
            // }

            const response = await handleAsset(request, env, ctx)

            if (response.status === 404) {
                console.log('Asset not found, sending to request handler')
                const requestResponse = await handleRequest(request, env, ctx)
                return requestResponse
            }

            return response
        } catch (error) {
            // Return 500 if error is not handled
            console.log(error)
            return new Response('Internal Server Error', { status: 500 })
        }
    },
}

export default worker

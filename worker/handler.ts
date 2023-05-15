import { getAssetFromKV, MethodNotAllowedError, NotFoundError } from '@cloudflare/kv-asset-handler'

import appRequestHandler from '~/app/server'
import ASSET_MANIFEST from '__STATIC_CONTENT_MANIFEST'

export async function handleRequest(request: Request, env: Env, ctx: ExecutionContext) {
    return appRequestHandler(request)
}

export async function handleAsset<Env extends { __STATIC_CONTENT: string; NODE_ENV: string }>(
    request: Request,
    env: Env,
    ctx: ExecutionContext
): Promise<Response> {
    try {
        return await getAssetFromKV(
            {
                request,
                waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
                cacheControl(request) {
                    const url = new URL(request.url)

                    if (url.pathname.startsWith('/build')) {
                        return {
                            browserTTL: 60 * 10, //60 * 24 * 365,
                            edgeTTL: 60 * 10, //60 * 24 * 365,
                        }
                    }

                    return {
                        browserTTL: 60 * 10,
                        edgeTTL: 60 * 10,
                    }
                },
                ASSET_NAMESPACE: env.__STATIC_CONTENT,
                ASSET_MANIFEST: ASSET_MANIFEST,
            }
        )
    } catch (error) {
        if (error instanceof MethodNotAllowedError || error instanceof NotFoundError) {
            return new Response('Not Found', { status: 404 })
        }

        throw error
    }
}

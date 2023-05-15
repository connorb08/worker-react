import * as esbuild from 'esbuild'

const IS_PRODUCTION = true
// process.env.NODE_ENV === 'production'

const buildSiteScripts = [
    {
        entryPoints: ['./worker/root.ts'],
        entryNames: 'root-[hash]',
        outdir: './public',
        bundle: true,
        minify: true,
        sourcemap: !IS_PRODUCTION,
        format: 'esm',
        metafile: true,
        define: {
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        },
    },
    {
        entryPoints: ['./app/client.entry.tsx'],
        entryNames: 'client-[hash]',
        outdir: './public/build',
        bundle: true,
        minify: IS_PRODUCTION,
        sourcemap: !IS_PRODUCTION,
        format: 'esm',
        metafile: true,
        define: {
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        },
    },
]

// const buildStepOne = [
//     {
//         name: 'Build root script',
//         build: {
//             entryPoints: ['./worker/root.ts'],
//             bundle: true,
//             minify: IS_PRODUCTION,
//             sourcemap: !IS_PRODUCTION,
//             format: 'esm',
//             metafile: true,
//             outfile: './public/root.js',
//             define: {
//                 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
//             },
//         },
//     },
//     {
//         name: 'Build client entry',
//         build: {
//             entryPoints: ['./app/client.entry.tsx'],
//             entryNames: 'client-[hash]',
//             outdir: './public/build',
//             bundle: true,
//             minify: IS_PRODUCTION,
//             sourcemap: !IS_PRODUCTION,
//             format: 'esm',
//             metafile: true,
//             define: {
//                 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
//             },
//         },
//     },
// ]

async function build() {
    const startTime = Date.now()

    console.log(IS_PRODUCTION ? 'Building in production...' : 'Building in development...')

    const __TAILWIND_SCRIPT = process.argv[2] || '/build/tailwind.css'
    console.log(__TAILWIND_SCRIPT)

    const scriptFiles = []

    for await (const buildStep of buildSiteScripts) {
        try {
            const result = await esbuild.build(buildStep)
            const resultData = result.metafile

            for (const output in resultData.outputs) {
                console.log(`output file: ${output}`)
                const str1 = output.replace('public/build', '/build')
                const str2 = str1.replace('public/', '')
                scriptFiles.push(str2)
            }
        } catch (error) {
            console.log('Error on building site assets!')
            console.log(error)
        }
    }

    console.log(scriptFiles)
    const buildFiles = scriptFiles.join('_|_')

    const define = {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        __SCRIPT_FILES: `"${buildFiles}"`,
        __TAILWIND_SCRIPT: `"${__TAILWIND_SCRIPT}"`,
    }

    const buildStepTwo = [
        {
            entryPoints: ['./worker/index.ts'],
            bundle: true,
            minify: IS_PRODUCTION,
            sourcemap: !IS_PRODUCTION,
            format: 'esm',
            metafile: true,
            external: ['__STATIC_CONTENT_MANIFEST'],
            outfile: './dist/index.js',
            define,
        },
        {
            entryPoints: ['./worker/service-worker.ts'],
            bundle: true,
            minify: IS_PRODUCTION,
            sourcemap: !IS_PRODUCTION,
            format: 'esm',
            metafile: true,
            outfile: './public/service-worker.js',
            define,
        },
    ]

    for await (const buildStep of buildStepTwo) {
        try {
            const result = await esbuild.build(buildStep)
            const resultData = result.metafile

            for (const output in resultData.outputs) {
                console.log(`output file: ${output}`)
            }
        } catch (error) {
            console.log('Error on building site assets!')
            console.log(error)
        }
    }

    const endTime = Date.now()
    console.log(`Built in ${endTime - startTime}ms`)
}

build().catch((e) => console.error('Unknown error caught during build:', e))

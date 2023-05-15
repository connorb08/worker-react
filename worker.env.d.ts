/// <reference types="@cloudflare/workers-types" />

// Required by the worker adapter
declare module '__STATIC_CONTENT_MANIFEST' {
    const value: string
    export default value
}

interface Env {
    __STATIC_CONTENT: string
    NODE_ENV: string
    connorbrayapi: any
}

// interface Env {
//     // Required by the worker adapter
//     __STATIC_CONTENT: string;
//     NODE_ENV: string;
// }

// declare global {
//     namespace NodeJS {
//       interface ProcessEnv {
//         GITHUB_AUTH_TOKEN: string;
//         NODE_ENV: 'development' | 'production';
//         PORT?: string;
//         PWD: string;
//       }
//     }
//   }

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
//   export {}

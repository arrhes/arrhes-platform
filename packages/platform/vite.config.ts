import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { resolve } from "path"
import { defineConfig } from 'vite'


export default defineConfig(() => {
    return {
        plugins: [
            react({ include: "**/*.tsx", }),
            tailwindcss(),
        ],
        assetsInclude: ['**/*.md'],
        root: './src',
        base: "/",
        envDir: "../",
        server: {
            host: true,
            port: 5173,
            watch: {
                usePolling: true
            },
            hmr: true,
        },
        build: {
            outDir: '../build',
            rollupOptions: {
                output: {
                    entryFileNames: "[hash].js",
                    chunkFileNames: "[hash].js",
                    assetFileNames: "[hash].[ext]",
                    manualChunks(id: string) {
                        if (id.includes('react-dom')) {
                            return 'react-dom'
                        }
                    },

                }
            }
        },
        resolve: {
            conditions: ['module', 'browser', 'development|production'],
            alias: {
                // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
                '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
                "#": resolve(__dirname, "./src"),
                "assets": resolve(__dirname, "./src/assets"),
                "contexts": resolve(__dirname, "./src/contexts"),
                "components": resolve(__dirname, "./src/components"),
                "features": resolve(__dirname, "./src/features"),
                "routes": resolve(__dirname, "./src/routes"),
                "utilities": resolve(__dirname, "./src/utilities"),
            },
        },
    }
})

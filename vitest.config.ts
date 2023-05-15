/// <reference types="vitest" />
// @ts-nocheck 
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
    },
})

import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import next from 'next/core-web-vitals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    tseslint.configs.recommended,
    next.configs.reccommended,
])

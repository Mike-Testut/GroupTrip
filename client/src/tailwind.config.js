/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    darkMode: 'media', // respects OS dark mode preference
    theme: {
        extend: {
            colors: {
                coral: {
                    DEFAULT: '#D85A30',
                    dark:    '#993C1D',
                    light:   '#FAECE7',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                DEFAULT: '8px',
            },
        },
    },
    plugins: [],
}
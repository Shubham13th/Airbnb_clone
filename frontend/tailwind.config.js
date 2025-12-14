/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff385c',
                'primary-hover': '#d90b3e',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
            },
            boxShadow: {
                'card': '0 6px 16px rgba(0,0,0,0.12)',
                'floating': '0 8px 28px rgba(0,0,0,0.28)',
            }
        },
    },
    plugins: [],
}

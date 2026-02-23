/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#EF4585',
                    50: '#FDECF3',
                    100: '#FBD9E6',
                    200: '#F8B3CD',
                    300: '#F48DB4',
                    400: '#F1679B',
                    500: '#EF4585',
                    600: '#E61E6A',
                    700: '#BB1856',
                    800: '#8F1242',
                    900: '#640D2E',
                },
            },
        },
    },
    plugins: [],
}

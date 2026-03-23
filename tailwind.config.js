/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'party-green': '#A3E635', // Lime 400
                'party-blue': '#38BDF8', // Sky 400
                'party-orange': '#FB923C', // Orange 400
                'party-yellow': '#FACC15', // Yellow 400
                'party-purple': '#C084FC', // Purple 400
            },
            fontFamily: {
                'party': ['Chewy', 'cursive'],
                'body': ['Fredoka', 'sans-serif'],
                'signature': ['Dancing Script', 'cursive'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                }
            }
        },
    },
    plugins: [],
}

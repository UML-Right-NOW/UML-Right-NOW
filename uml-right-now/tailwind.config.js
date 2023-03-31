/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "hero-pattern": "url('https://tailwindcss.com/_next/static/media/refactoringui@75.3f8c4933.jpg')",
            },
            colors: {
                "rowdy-blue": "#0369B1",
                "rowdy-red": "#b30000",
                "light-gray": "#EFEFEF",
                "deep-grey": "#979797"
            },
            keyframes: {
                "slide-in": {
                    "100%": { transform: "translateX(0%)" }
                }
            },
        },
    },
    plugins: [],
};

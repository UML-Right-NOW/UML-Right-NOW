/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "rowdy-blue": "#0369B1",
                "rowdy-red": "#F80A0A"
            }
        },
    },
    plugins: [],
};

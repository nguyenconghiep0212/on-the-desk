/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        '<sm': {'max': '360px'},
        // => @media (max-width: 360px) { ... }
        },
        boxShadow: {
          'header-shadow': 'inset 0px -70px 10px #18191A',
        }
    },
  },
  plugins: [],
}


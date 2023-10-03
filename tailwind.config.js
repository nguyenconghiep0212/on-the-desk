/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        "<sm": { max: "600px" },

        "<xs": { max: "480px" },

        "<xxs": { max: "280px" },

        xxs: "280px",

        xs: "425px",

        sm: "600px",

        md: "768px",

        lg: "1024px",

        xl: "1200px",

        "2xl": "1440px",

        "3xl": "2560px",
        // => @media (min-width: 2560px) { ... }
        mobile: { max: "1024px" },
        desktop: "1024px",
      },

      boxShadow: {
        "header-shadow": "inset 0px -70px 10px #18191A",
      },
      colors: {
        "primary-blue-dark": "#2F66B3",
        "primary-blue-medium": "#0096FF",
        "primary-blue-light": "#00D7FF",
        "primary-blue-light-max": "#72FFFF",
        // Configure your color palette here
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        "<sm": { max: "640px" },
        "<xs": { max: "360px" },
        "<xxs": { max: "240px" },
        mobile: { max: "960px" },
        desktop: "960px",
      },

      boxShadow: {
        "header-shadow": "inset 0px -70px 10px #18191A",
      },
    },
  },
  plugins: [],
};

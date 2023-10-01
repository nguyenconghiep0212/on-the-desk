/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        "<sm": { max: "600px" },
        "<xs": { max: "480px" },
        "<xxs": { max: "280px" },
        
        'xxs': '280px',
        'xs': '480px',
        // => @media (min-width: 640px) { ... }
        'sm': '600px',
        // => @media (min-width: 640px) { ... }
  
        'md': '767px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '979px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1200px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        mobile: { max: "1024px" },
        desktop: "1024px",
      },

      boxShadow: {
        "header-shadow": "inset 0px -70px 10px #18191A",
      }, 
      colors: {
      'primary-blue-dark': '#2F66B3',
      'primary-blue-medium': '#0096FF',
      'primary-blue-light': '#00D7FF',
      'primary-blue-light-max': '#72FFFF'
      // Configure your color palette here
    }
    },
   
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./contact_us/**/*.{html,js}", ],
  
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        exo2: ["'Exo 2'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

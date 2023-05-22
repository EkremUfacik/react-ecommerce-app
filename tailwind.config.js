/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D4073",
        secondary: "#3D4F73",
        dark: "#1A1E26",
        darkGray: "#324359",
        live: "#5ABFA3",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#f5cb5c',
        'beige': "#e8eddf",
        'gray': "#cfdbd5",
        'dark': '#333533'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#e76f51',
        'beige': "#e9c46a",
        'gray': "#2a9d8f",
        'dark': '#264653'
      }
    },
  },
  plugins: [],
}

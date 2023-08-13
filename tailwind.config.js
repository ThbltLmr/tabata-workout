/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#e7e7e7',
        'mid-gray': '#d1d1d1',
        'dark-gray': '#a9a9a9'
      }
    },
  },
  plugins: [],
}

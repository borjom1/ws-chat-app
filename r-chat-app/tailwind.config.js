/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eerie-black': '#181818',
        'eerie-black-f': '#1F1F1F',
        'gray': '#333333',
        'platinum-e8': '#E8E8E8',
        'silver-bf': '#BFBFBF',
        'blue-39': '#39528E',
      }
    },
  },
  plugins: [],
}
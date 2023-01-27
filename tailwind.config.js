/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'lavander': '#CDB4DB',
        'sky-blue':'#BDE0FE',
        'inactive-gray':'#666666',
        'white-2':'#FFFFFF'
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'heebo':['Heebo','sans-serif'],
      'inter':['Inter','sans-serif'],
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
      colors: {
        'slide-black':'#000000',
        'black':'#262626',
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
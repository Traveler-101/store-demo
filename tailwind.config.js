/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1240px',
    },
    extend: {
      colors: {
        primary: '#00be9a',
        secondary: '#5eb69c',
        danger: '#e26237',
        dark: '#333',
        light: '#f5f5f5',
        price: '#aa2113',
      },
      height: {
        '52px': '52px',
        '132px': '132px',
        '500px': '500px',
        '50px': '50px',
        '112px': '112px',
        '404px': '404px',
        '304px': '304px',
        '306px': '306px',
        '610px': '610px',
        '305px': '305px',
        '355px': '355px',
        '67px': '67px',
        '588px': '588px',
        '178px': '178px',
      },
      width: {
        '1240px': '1240px',
        '250px': '250px',
        '304px': '304px',
        '244px': '244px',
        '248px': '248px',
        '968px': '968px',
        '242px': '242px',
        '200px': '200px',
        '180px': '180px',
      },
    },
  },
  plugins: [],
}

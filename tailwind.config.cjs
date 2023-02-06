/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grey: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        primary: '#A08761',
        khaki: {
          50: '#E5DED4',
          100: '#DDD4C7',
          200: '#CEC1AD',
          300: '#BFAE94',
          400: '#AF9A7A',
          500: '#A08761',
          600: '#7D6A4B',
          700: '#5A4C36',
          800: '#372F21',
          900: '#14110C'
        },
      },
    },
  },
  plugins: [],
};

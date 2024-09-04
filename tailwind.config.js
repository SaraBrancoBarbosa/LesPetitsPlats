/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js", "./src/*.js", "./*.{html,js}"],
  theme: {
    fontSize: {
      '5xl': '2.75rem',
    },
    extend: {
      colors: {
        "yellow": "#FFD15B",
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
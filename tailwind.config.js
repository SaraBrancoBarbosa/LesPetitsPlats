/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.js", "./src/*.js", "./*.{html,js}"],
  theme: {
    fontSize: {
      '5xl': '2.75rem',
    },
    extend: {
      colors: {
        "yellow": "#FFD15B",
        "grey": "#7A7A7A",
        "lightgrey": "#C6C6C6",
        "background": "#EDEDED",
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        "2xl": "1.5rem",
        "lg": "1.125rem",
        "xs": "0.75rem",
        "sm": "0.875rem",
      },
      gridTemplateColumns: {
        "card": "repeat(auto-fit, minmax(380px, 1fr))",
      },
    },
  },
  plugins: [],
}
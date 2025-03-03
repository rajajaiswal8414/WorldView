/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBlue: 'hsl(209, 23%, 22%)', // Dark Mode Elements
        veryDarkBlue: {
          bg: 'hsl(207, 26%, 17%)', // Dark Mode Background
          text: 'hsl(200, 15%, 8%)'  // Light Mode Text
        },
        darkGray: 'hsl(0, 0%, 52%)', // Light Mode Input
        veryLightGray: 'hsl(0, 0%, 98%)', // Light Mode Background
        white: 'hsl(0, 0%, 100%)', // Dark Mode Text & Light Mode Elements
      },
      screens: {
        xs: "480px", // Custom xs breakpoint
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
}


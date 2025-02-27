/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#76ABAE",
        secondary: "#222831",
        accent: "#F3EAC2",
        light: "#EEEEEE",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        code: ['"Source Code Pro"', "monospace"],
        display: ["Silkscreen", "cursive"],
        icon: ['"Rammetto One"', "cursive"],
      },
    },
  },
  plugins: [],
};

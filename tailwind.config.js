/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        display: ["Silkscreen", "sans-serif"],
        icon: ['"Rammetto One"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

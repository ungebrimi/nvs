/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        accent: "#f05532",
        vb: "#193659",
        vol: "#f05532",
        vod: "#ef4023",
        vp: "#fef6f5",
        "v-teal": "#62C5BD",
        "v-purple": "#8C52B8",
        "v-blue": "#1c4b9c",
        "v-green": "#3B6D16",
        "v-lbrown": "#A97623",
        "v-dbrown": "#84251E",
        "v-pink": "#C078A7",
        cyan: colors.cyan,
        orange: colors.orange,
      },
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        sm: "600px",
        md: "800px",
        lg: "1000px",
        xl: "1200px",
        "grid-1": "516px",
        "grid-2": "1072px",
        "grid-3": "1596px",
        "grid-4": "2120px",
      },
      spacing: {
        "grid-x": "500px",
        "grid-y": "375px",
        "grid-1": "516px",
        "grid-2": "1040px",
        "grid-3": "1564px",
        "grid-4": "2088px",
      },
    },
    colors: {
      mono: {
        50: "#111111",
        500: "#808080",
        900: "#fefefe",
      },
      rising: {
        200: "#fcc4c7",
        500: "#f5555f",
        600: "#d72f3c",
        700: "#b60106",
        900: "#620000",
      },
    },
    fontFamily: {
      sans: ["San Francisco", "Helvetica", "sans-serif"],
      "sans-bold": ["San Francisco Bold", "Helvetica", "sans-serif"],
    },
    fontSize: {
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2.5rem",
    },
  },
  plugins: [],
};

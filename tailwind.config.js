const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        textLight: "var(--color-text-light)",
        textDark: "var(--color-text-dark)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Roboto", "serif"],
      },
    },
  },

  plugins: [],
});

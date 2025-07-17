const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */

export default {
  plugins: [heroui()],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "// Make sure this path is correct for your project",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Degular", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-colo)",
        textColor: "var(--text-color)",
        white: "#FFF",
      },
    },
  },
};

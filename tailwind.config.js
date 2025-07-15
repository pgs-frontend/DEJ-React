/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path is correct for your project
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

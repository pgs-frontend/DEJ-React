/** @type {import('tailwindcss').Config} */

export default {
 content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Degular", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-colo)',
        textColor: 'var(--text-color)',
        white: '#FFF'
      }
    }
  },
}


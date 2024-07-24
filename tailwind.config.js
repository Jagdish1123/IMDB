/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'black-600': '#333',  // Custom color
        'cyan-600': '#00bcd4', // Custom color (example)
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    colors: {
      "background-primary": "#151517", // this should match exactly
      "background-secondary": "#202120",
      "main-text": "#80b918",
      "secondary-text": "#bfc0c0",
    },
  },
  plugins: [],
};

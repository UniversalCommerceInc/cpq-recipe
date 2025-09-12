/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#7c9cf5",
          600: "#688bf4",
          700: "#5277e6",
        },
      },
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        glow: "0 10px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};

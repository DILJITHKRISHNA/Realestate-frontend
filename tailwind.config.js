/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'],
        jaldi: ['Jaldi', 'sans-serif'],
        'league-spartan': ['League Spartan', 'sans-serif'],
        jura: ['Jura', 'sans-serif'],
        'mona-sans': ['Mona Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


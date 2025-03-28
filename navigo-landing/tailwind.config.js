/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          // Primary Colors
          primary: {
            DEFAULT: '#006D77',
            dark: '#005a63',
          },
          secondary: {
            DEFAULT: '#E8AA42',
            dark: '#d09a3c',
          },
          // Secondary Colors
          sand: '#F8F1E9',
          earth: '#7A5C3C',
          accent: '#83C5BE',
        },
        // Rest of your theme config
      },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
  }
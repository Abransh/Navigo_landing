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
          // Primary Colors based on India-inspired palette
          primary: {
            DEFAULT: '#1A5F7A',  // Deep Teal
            dark: '#164d62',
            light: '#2d7d9b',
          },
          secondary: {
            DEFAULT: '#FF9933',  // Saffron Orange
            dark: '#e88929',
            light: '#ffae5c',
          },
          // Secondary Colors
          sand: '#FFF8EA',     // Warm Cream
          earth: '#BE5504',    // Terracotta
          navy: '#0A2342',     // Dark Navy for text
          
          // For backward compatibility with existing code
          accent: '#BE5504',   // Set accent to Terracotta
          
          // Extended semantic colors for flexibility
          background: '#FFF8EA',
          "background-alt": '#F7F0DC',
          foreground: '#0A2342',
          "foreground-muted": '#526985',
          border: '#E2D8C3',
          "border-strong": '#BE5504',
        },
        fontFamily: {
          // Using Montserrat for headers and titles
          heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
          // Using Inter for body text
          body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
          // Setting sans to the body font for convenience
          sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
          card: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          elevated: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        },
        backgroundImage: {
          'hero-pattern': "url('/images/indian-pattern.svg')",
          'wave-pattern': "url('/images/wave-pattern.svg')",
        },
      },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
  }
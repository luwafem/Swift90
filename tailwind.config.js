/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}', // Keeping your src path
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E86512",
        'tech-bg': '#0D0D10',
        'tech-cyan': '#00BFFF',
        'tech-magenta': '#FF00FF',
      },
      fontFamily: {
        // Here, we link our 'mono' utility to a CSS variable
        // that will be provided by next/font.
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      animationDelay: {
        300: '300ms',
        500: '500ms',
      },

      // --- ADD THIS SECTION ---
      keyframes: {
        'pulse-once': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.0)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)' },
        },
      },
      animation: {
        'pulse-once': 'pulse-once 1.5s ease-in-out',
      },
      // --- END OF ADDED SECTION ---
      
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
  ],
};
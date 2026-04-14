/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A192F',
        'brand-light': '#FFFFFF',
        'brand-accent': '#FF6B35',
        'brand-cyan': '#00E5FF',
        slate: {
          950: '#020617',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.4)',
        'glow-accent': '0 0 25px rgba(255, 107, 53, 0.4)',
        'premium-light': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'premium-hover': '0 20px 40px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Roboto', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

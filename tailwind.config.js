/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefcf4',
          100: '#fef9e7',
          200: '#fcf0c4',
          300: '#f8e397',
          400: '#f3d268',
          500: '#D4AF37',
          600: '#c49a28',
          700: '#b3871c',
          800: '#926d19',
          900: '#785a19',
        },
        secondary: {
          50: '#fefdfb',
          100: '#fefaf5',
          200: '#fcf3e6',
          300: '#f9ecd7',
          400: '#f6e5c8',
          500: '#F5E6D3',
          600: '#e8d4b8',
          700: '#dbc29d',
          800: '#ceb082',
          900: '#c19e67',
        },
        accent: {
          50: '#fdf8f0',
          100: '#faf1e0',
          200: '#f4e3c1',
          300: '#eed5a2',
          400: '#e8c783',
          500: '#B8860B',
          600: '#a67809',
          700: '#946a08',
          800: '#825c07',
          900: '#704e06',
        },
        surface: '#FAF8F5',
        warm: {
          gray: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
          }
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -2px rgba(212, 175, 55, 0.05)',
        'golden': '0 4px 14px 0 rgba(212, 175, 55, 0.2)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: .8,
            transform: 'scale(1.05)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
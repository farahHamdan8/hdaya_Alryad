/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        primary: {
          DEFAULT: '#C2185B',
          hover: '#D81B60',
          dark: '#880e4f',
          light: '#f48fb1',
          soft: '#fce4ec',
        },
        luxury: {
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          champagne: '#F7E7CE',
          darkBg: '#0A0A0C',
          darkSurface: '#121214',
          darkCard: '#1A1A1E',
          darkBorder: '#2A2A32',
          lightBg: '#FDFBF7',
          lightSurface: '#FFFFFF',
          lightCard: '#FFFFFF',
          lightBorder: '#F0ECE1',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        arabicSerif: ['Amiri', 'serif'],
        arabicSans: ['Cairo', 'Alexandria', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(194, 24, 91, 0.15)',
        'luxury-gold': '0 10px 30px -10px rgba(212, 175, 55, 0.2)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}

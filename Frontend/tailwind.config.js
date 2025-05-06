/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#15803d',
        },
        secondary: {
          light: '#9ae6b4',
          DEFAULT: '#48bb78',
          dark: '#2f855a',
        },
        accent: {
          light: '#fed7aa',
          DEFAULT: '#fb923c',
          dark: '#c2410c',
        },
        success: {
          light: '#a7f3d0',
          DEFAULT: '#34d399',
          dark: '#059669',
        },
        warning: {
          light: '#fde68a',
          DEFAULT: '#fbbf24',
          dark: '#d97706',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#f87171',
          dark: '#dc2626',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
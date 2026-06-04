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
          50: '#f5ebff',
          100: '#ead7ff',
          500: '#6A00FF',
          600: '#5a00e6',
          700: '#4a00cc',
        },
        accent: {
          50: '#fff0f7',
          500: '#FF2D55',
          600: '#e6283b',
        },
        warning: {
          500: '#FF8C00',
          600: '#e67e00',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6A00FF 0%, #FF2D55 50%, #FF8C00 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f5ebff 0%, #fff0f7 100%)',
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

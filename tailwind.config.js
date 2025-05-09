/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7f7',
          100: '#f7f7f7',
          200: '#ffc0cb',
          300: '#ff9ab3',
          400: '#ff759b',
          500: '#d14a61',
          600: '#a8374d',
          700: '#7a2839',
          800: '#4d1a27',
          900: '#200d14',
          DEFAULT: '#d14a61',
        },
        success: {
          DEFAULT: '#4CAF50',
          dark: '#3a8c3f',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
        neutral: {
          50: '#fcf9f6',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: {
          page: '#f7f7f7',
          card: '#ffffff',
        },
        border: {
          DEFAULT: '#ffc0cb',
          accent: '#d14a61',
        },
        text: {
          primary: '#5e5e5e',
          secondary: '#5e5e5e',
          muted: '#5e5e5e',
          light: '#ffffff',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        scaleIn: 'scaleIn 0.3s ease-in-out',
        slideInRight: 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

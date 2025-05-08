// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand (Dimoss)
        brand: {
          50: '#fff8eb',
          100: '#fcf3d8',
          200: '#f8e4ad',
          300: '#f4d17c',
          400: '#efb94a',
          500: '#e99e28',
          600: '#d97e1d',
          700: '#b3591c',
          800: '#8f471e',
          900: '#733c1c',
          950: '#421f0e',
          DEFAULT: '#e99e28',
        },
        // Semantic Accents
        success: {
          DEFAULT: '#4CAF50',
          dark: '#3a8c3f',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
        // Versatile Neutral Scale
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
        // Contextual Tokens
        background: {
          page: '#fcf9f6',
          card: '#fff8eb',
        },
        border: {
          DEFAULT: '#E5E7EB',
          accent: '#F8E4AD',
        },
        text: {
          primary: '#1F2937',
          secondary: '#4B5563',
          muted: '#6B7280',
          light: '#F3F4F6',
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

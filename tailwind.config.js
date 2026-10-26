/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy palette (used in light mode for text/accents and dark mode backgrounds)
        navy: {
          50: '#f1f5fb',
          100: '#e2ebf7',
          200: '#c5d8ef',
          300: '#9abbe2',
          400: '#6793d1',
          500: '#4071bf',
          600: '#2e57a3',
          700: '#274685',
          800: '#1d3260',
          900: '#0f1e3c',
          950: '#081226',
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          soft: '#67e8f9',
          deep: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

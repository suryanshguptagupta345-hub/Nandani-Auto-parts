/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07080A',
          900: '#0F1117',
          800: '#181B24',
          700: '#242836',
        },
        electric: {
          500: '#0066FF',
          400: '#00D2FF',
          600: '#0047BB',
        },
        accentAmber: '#FF6B00',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 102, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 210, 255, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}

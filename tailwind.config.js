/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hh: {
          green: '#220732', // Replaced with dusk sunset dark purple
          darkgreen: '#140320', // Replaced with deep dusk background
          lightgreen: '#360E4A', // Replaced with dusk purple accent
          yellow: '#FFDD00',
          pink: '#FF007A',
          orange: '#FF5722',
          cream: '#F6F3E7',
          offwhite: '#FFFDF5',
          dark: '#0E0416',
        },
      },
      fontFamily: {
        display: ['Syne', 'Playfair Display', 'serif'],
        condensed: ['Bebas Neue', 'Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      aspectRatio: {
        square: '1 / 1',
      },
      boxShadow: {
        poster: '6px 6px 0px 0px rgba(0, 0, 0, 0.9)',
        'poster-pink': '6px 6px 0px 0px #FF007A',
        'poster-yellow': '6px 6px 0px 0px #FFDD00',
        'poster-orange': '6px 6px 0px 0px #FF5722',
      },
    },
  },
  plugins: [],
};

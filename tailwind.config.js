const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './icons/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      colors: {
        gray: colors.neutral,
        primary: '#07a4ff',
        blue: {
          50: '#edfcff',
          100: '#d7f6ff',
          200: '#b9f0ff',
          300: '#88eaff',
          400: '#50dbff',
          500: '#28c2ff',
          600: '#07a4ff',
          700: '#0a8deb',
          800: '#0f70be',
          900: '#135f95',
          950: '#11395a'
        },
        black: '#121212',
        white: '#F5F5F5'
      },
      borderWidth: {
        sizeFocus: '3px'
      },
      gridTemplateColumns: {
        checkout: '1fr, 40%'
      },
      gridTemplateColumns: {
        sale: '10rem, 1fr'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 }
        },
        tuilt: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75% ': { transform: 'rotate(-3deg)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 100s linear infinite',
        carouselPaused: 'marquee 100s linear infinite paused',
        blink: 'blink 1.4s both infinite',
        tuilt: 'tuilt 3s infinite linear'
      }
    },
    future: {
      hoverOnlyWhenSupported: true
    },
    plugins: [
      require('@tailwindcss/typography'),
      plugin(({ matchUtilities, theme }) => {
        matchUtilities(
          {
            'animation-delay': (value) => {
              return {
                'animation-delay': value
              };
            }
          },
          {
            values: theme('transitionDelay')
          }
        );
      })
    ]
  }
};

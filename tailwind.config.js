const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/config/**/*.{js,ts,jsx,tsx}'
    ]
  },
  darkMode: 'media',
  theme: {
    colors: {
      ...colors,
      'light-blue': colors.sky,
      transparent: 'transparent',
      current: 'currentColor'
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      numbers: ['Poppins', 'sans-serif']
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
          '25%': { transform: 'rotate(0deg) scale(1.1)' },
          '50%': { transform: 'rotate(3deg) scale(1.2)' },
          '75%': { transform: 'rotate(0deg) scale(1.1)' }
        }
      },
      animation: {
        wiggle: 'wiggle 350ms ease-in-out'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

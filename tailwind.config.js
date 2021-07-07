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

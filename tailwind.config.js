// @ts-check
const colors = require('tailwindcss/colors')

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 */
function addCustomUtilities({ addUtilities }) {
  addUtilities({
    '.w-common-gap': { width: 'var(--common-gap)' },
    '.h-common-gap': { height: 'var(--common-gap)' },
    '.outline-hl': { '@apply outline outline-blue-500 outline-2': {} },
    '.outline-err': { '@apply outline outline-red-500 outline-2': {} },
    '.transition-bg': { 'transition-property': 'background-color' },
  })
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      gray: colors.gray,
      black: colors.black,
      white: colors.white,
      blue: {
        100: '#c9fcea',
        200: '#95f9df',
        300: '#5feed5',
        400: '#37ded0',
        500: '#00c9c9',
        600: '#009dac',
        700: '#007790',
        800: '#005674',
        900: '#003f60',
      },
      green: {
        100: '#e3fede',
        200: '#c1fdbe',
        300: '#9cfa9f',
        400: '#82f691',
        500: '#5af07c',
        600: '#41ce6f',
        700: '#2dac62',
        800: '#1c8b55',
        900: '#11734d',
      },
      purple: {
        100: '#d8dfff',
        200: '#b2beff',
        300: '#8b9cff',
        400: '#6f82ff',
        500: '#3f56ff',
        600: '#2e40db',
        700: '#1f2eb7',
        800: '#141e93',
        900: '#0c137a',
      },
      yellow: {
        100: '#fff9cc',
        200: '#fff299',
        300: '#ffe866',
        400: '#ffdf3f',
        500: '#ffd000',
        600: '#dbae00',
        700: '#b78e00',
        800: '#937000',
        900: '#7a5a00',
      },
      red: {
        100: '#ffe4d9',
        200: '#ffc4b4',
        300: '#ff9c8e',
        400: '#ff7772',
        500: '#ff444e',
        600: '#db3149',
        700: '#b72244',
        800: '#93153e',
        900: '#7a0d39',
      },
    },
    extend: {},
  },
  plugins: [addCustomUtilities],
}

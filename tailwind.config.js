/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/client/**/*.{vue,js,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', { fontFeatureSettings: '"cv11", "cv03", "cv04"' }]
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: false
  },
  safelist: [
    {
      pattern: /bg-/
    },
    {
      pattern: /text-/
    },
    { pattern: /border/ }
  ]
};

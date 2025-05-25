const scrollbarHide = require('tailwind-scrollbar-hide');
const twAnimateCss = require('tw-animate-css/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide,
    twAnimateCss
  ],
}

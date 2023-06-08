/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        ['noto-serif']: ['var(--font-noto-serif)'],
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [],
};

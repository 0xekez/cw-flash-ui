const generateColorClass = (variable) => `rgb(var(--${variable}))`

const colors = {
    background: generateColorClass("background"),
    card: generateColorClass("card"),
    accent: generateColorClass("accent"),
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
	colors
    },
  },
  plugins: [],
}

// tailwind.config.js
const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{jsx,js,ts,tsx,css}",
    "./node_modules/@heroui/theme/dist/components/(button|input|ripple|spinner|form).js"
  ],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [heroui()],
};

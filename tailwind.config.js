/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-1": "#000000",
				"primary-2": "#101f3f",
				"primary-3": "#1b3260",
				"primary-4": "#357dc0",
				"primary-5": "#7cc2e7",
				"secondary-1": "#1c1957",
				"secondary-2": "#5733a6",
				"secondary-3": "#8c60da",
				"secondary-4": "#ebedfa",
				"tertiary-1": "#360b17",
				"tertiary-2": "#a02738",
				"tertiary-3": "#db4b62",
				"tertiary-4": "#f0d7d6",
			},
		},
	},
	plugins: [],
};

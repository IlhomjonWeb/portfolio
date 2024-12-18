/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}', // Include components folder if applicable
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};

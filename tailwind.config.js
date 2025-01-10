/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#561ed8',
        secondary: '#8c38ff',
        dark: '#131a26',
        light: '#eee',
      },
    },
  },
  plugins: [],
};

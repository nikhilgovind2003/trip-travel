/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BC76', // Custom primary color
        secondary: '#00965F', // Custom secondary color
        accent: '#0073E6', // Custom accent color
        danger: '#FF4C4C', // Custom danger color
        success: '#28A745', // Custom success color
        warning: '#FFC107', // Custom warning color
        info: '#17A2B8', // Custom info color
      },
    },
  },
  plugins: [],
};

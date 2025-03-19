/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A3AFF", // Rich Royal Blue for a bold, modern look
        secondary: "#30288F", // Deep Indigo for subtle contrast
        accent: "#009FFD", // Bright Electric Blue for highlights
        danger: "#E63946", // Vivid Red for warnings and errors
        success: "#2DCE89", // Fresh Green for positive feedback
        warning: "#FFB400", // Warm Amber for caution messages
        info: "#00A6FB", // Calming Blue for informational alerts
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-out-up': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-out-up': 'fade-out-up 0.6s ease-out',
        'flip': 'flip 1s ease-in-out forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

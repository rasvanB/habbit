module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "dark-bg": "url('./assets/bg-dark.png')",
        "light-bg": "url('./assets/bg.png')",
      },
    },
  },
  plugins: [],
};

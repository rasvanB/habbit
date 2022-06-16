module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "dark-bg-svg": "url('./assets/bg-dark.svg')",
        "light-bg-svg": "url('./assets/bg.svg')",
        "dark-bg-mid": "url('./assets/bg-dark-mid.svg')",
        "light-bg-mid": "url('./assets/bg-mid.svg')",
        "mesh-bg": "url('./assets/mesh-bg.webp')",
        "mesh-bg-dark": "url('./assets/mesh-bg-dark.webp')",
        "google-icon": "url('./assets/google.png')",
        "facebook-icon": "url('./assets/facebook.png')",
        "twitter-icon": "url('./assets/twitter.png')",
      },
    },
    screens: {
      mobile: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

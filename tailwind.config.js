/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        "title-color": "#403F3F",
        "button-text": "#100F0F",
        "button-bg": "#FFC107",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/banner_1.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};

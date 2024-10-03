const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "240px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryTxt: "#d9dfec",
        secondary: "#bac8ca",
        primarybg: "#55567e",
        secondarybg: "#9197c3",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to bottom left, #000000, #000000, #000000, #000000, #000000, #171616, #272526, #373436, #5e5a5f, #86838b, #afb0bb, #d9dfec)',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});

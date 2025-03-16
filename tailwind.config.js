module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColors: {
        white: "#FFFFFF",
        black: "#000000",
        cyan: "#00EFFF",
        pink: "#9A3379",
        green: "#00FF0D",
        orange: "#DDBB0F",
        red: "#CB6263",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default {
  content: [
    "./index.html", // Arquivo HTML principal
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Fonte padrão Roboto
        poppins: ["Poppins", "sans-serif"], // Fonte adicional Poppins
      },
      colors: {
        "cyan-zero": "#02AEBAF", // Cor ciano
        "pink-zero": "#9A3379", // Cor rosa
      },
      screens: {
        xs: "320px", // Pequenos celulares
        sm: "480px", // Celulares padrão
        md: "768px", // Tablets
        lg: "1024px", // Laptops
        xl: "1280px", // Desktops padrão
        "2xl": "1536px", // Monitores grandes
        "3xl": "1920px", // Full HD e monitores ultrawide
        "4xl": "2560px", // 2K
        "5xl": "3440px", // UltraWide
        "6xl": "3840px", // 4K
      },
    },
  },
  plugins: [import("tailwind-scrollbar")], // Plugin para estilizar scrollbars
  variants: {
    extend: {
      after: ["hover", "focus"], // Habilita pseudo-elementos como `after` para hover e focus
      scrollbar: ["rounded"], // Permite bordas arredondadas no scroll
    },
  },
};

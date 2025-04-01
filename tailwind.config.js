export default {
  content: [
    "./index.html", // Arquivo HTML principal
    "./src/**/*.{html,js,jsx,ts,tsx}", // Todos os arquivos dentro de src com extensões suportadas
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Fonte padrão Roboto
        poppins: ["Poppins", "sans-serif"], // Fonte adicional Poppins
      },
      colors: {
        'cyan-zero': '#02AEBAF', // Cor ciano
        'pink-zero': '#9A3379' // Cor rosa
      },
    },
  },
  plugins: [require("tailwind-scrollbar")], // Plugin para estilizar scrollbars
  variants: {
    extend: {
      after: ["hover", "focus"], // Habilita pseudo-elementos como `after` para hover e focus
      scrollbar: ["rounded"], // Permite bordas arredondadas no scroll
    },
  },
};

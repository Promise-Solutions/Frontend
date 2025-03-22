module.exports = {
  content: [
    "./index.html", // Arquivo HTML principal
    "./src/**/*.{html,js,jsx,ts,tsx}", // Todos os arquivos dentro de src com extensões suportadas
  ],
  theme: {
    extend: {
      textColors: {
        white: "#FFFFFF", // Cor branca
        black: "#000000", // Cor preta
        cyan: "#00EFFF", // Cor ciano
        pink: "#9A3379", // Cor rosa
        green: "#00FF0D", // Cor verde
        orange: "#DDBB0F", // Cor laranja
        red: "#CB6263", // Cor vermelha
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Fonte padrão Roboto
        poppins: ["Poppins", "sans-serif"], // Fonte adicional Poppins
      },
      screens: {
        xs: "480px", // Breakpoint extra pequeno
        sm: "640px", // Breakpoint pequeno
        md: "768px", // Breakpoint médio
        lg: "1024px", // Breakpoint grande
        xl: "1280px", // Breakpoint extra grande
        "2xl": "1536px", // Breakpoint duplo extra grande
      },
    },
  },
  plugins: [], // Plugins adicionais podem ser adicionados aqui
  variants: {
    extend: {
      after: ["hover", "focus"], // Habilita pseudo-elementos como `after` para hover e focus
    },
  },
};

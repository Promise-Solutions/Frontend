import { defineConfig } from "vite"; // Importa a função para definir a configuração do Vite
import react from "@vitejs/plugin-react-swc"; // Plugin para suporte ao React com SWC
import tailwindcss from "@tailwindcss/vite"; // Plugin para integração com Tailwind CSS

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Adiciona suporte ao React
    tailwindcss(), // Adiciona suporte ao Tailwind CSS
  ],
  server: {
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    port: 8080, // Define a porta do servidor de desenvolvimento
  },
});

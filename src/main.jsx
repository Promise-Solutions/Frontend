// Importando estilos globais
import "./styles/global.css";

// Importando StrictMode do React para destacar possíveis problemas na aplicação
import { StrictMode } from "react";

// Importando createRoot do ReactDOM para renderizar a aplicação
import { createRoot } from "react-dom/client";

// Importando o componente principal App
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Renderizando o componente App dentro do elemento root com StrictMode ativado
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

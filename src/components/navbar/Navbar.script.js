import { useEffect, useState } from "react"; // Importa hooks do React
import React from "react"; // Importa React para criar elementos
import { Link, useNavigate } from "react-router-dom"; // Importa o componente Link e o hook useNavigate

// Hook personalizado para encapsular a lógica do Navbar
export const useNavbarLogic = () => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  // useState para armazenar a aba ativa com base no caminho atual da URL
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  // useEffect para configurar e limpar o listener de eventos de mudança de rota
  useEffect(() => {
    // Função que atualiza a aba ativa quando a rota muda
    const handleRouteChange = () => setActiveTab(window.location.pathname);

    // Adiciona um listener para o evento "popstate" (navegação do histórico)
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup: Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []); // Array vazio significa que o efeito roda apenas uma vez (comportamento de "componentDidMount")

  // Função para tratar cliques nas abas do Navbar
  // Redireciona o usuário para a rota correspondente
  const handleTabClick = (id) => {
    navigate(`/${id}`); // Substitui window.location.href por navigate
  };

  // Função para tratar o logout
  // Redireciona o usuário para a página de login
  const handleLogout = () => {
    const navigate = useNavigate(); // Inicializa o hook useNavigate
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login"); // Substitui window.location.href por navigate
  };

  // Retorna os estados e funções para serem usados no componente Navbar
  return { activeTab, handleTabClick, handleLogout };
};

// Vetor que define as abas do Navbar
// Cada aba tem um ID (usado para navegação) e um nome (exibido no Navbar)
export const tabs = [
  { id: "users", name: "Usuários" },
  { id: "jobs", name: "Serviços" },
  { id: "bar", name: "Bar" },
  { id: "dashboard", name: "Dashboard" },
  { id: "reports", name: "Relatórios" },
];

// Função para gerar os itens de aba dinamicamente
// Recebe a aba ativa como parâmetro
export const generateTabItems = (activeTab) =>
  tabs.map(({ id, name }) =>
    React.createElement(
      Link, // Usa o componente Link para navegação
      {
        key: id, // Chave única para cada item
        id: `${id}_id`, // Define um ID único para o elemento
        to: `/${id}`, // Define o destino da navegação
        className: `cursor-pointer hover:text-[#9A3379] hover:pb-[20px] transition-all duration-100 ease-in-out py-2 px-3 relative ${
          activeTab === `/${id}`
            ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#9A3379] after:transition-all after:duration-100 after:ease-in-out after:w-full"
            : "hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-0 hover:after:h-[2px] hover:after:bg-[#9A3379] hover:after:transition-all hover:after:duration-100 hover:after:ease-in-out hover:after:w-full"
        }`, // Corrige a animação para width 0% -> 100%
      },
      name // Conteúdo do Link é o nome da aba
    )
  );

const waitForLogo = (onLogoClick) => {
  const logo = document.getElementById("logo_id");
  if (logo) {
    logo.addEventListener("click", onLogoClick); // Use the callback for navigation
  }
};

export const initializeLogoClick = (navigate) => {
  waitForLogo(() => navigate("/")); // Pass navigate as a callback
};

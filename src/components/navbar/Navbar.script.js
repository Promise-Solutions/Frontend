import { useEffect, useState } from "react"; // Importa hooks do React
import React from "react"; // Importa React para criar elementos

// Hook personalizado para encapsular a lógica do Navbar
export const useNavbarLogic = () => {
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
    window.location.href = `/${id}`; // Atualiza a URL com base no ID da aba clicada
  };

  // Função para tratar o logout
  // Redireciona o usuário para a página de login
  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Retorna os estados e funções para serem usados no componente Navbar
  return { activeTab, handleTabClick, handleLogout };
};

// Vetor que define as abas do Navbar
// Cada aba tem um ID (usado para navegação) e um nome (exibido no Navbar)
export const tabs = [
  { id: "users", name: "Usuários" },
  { id: "bar", name: "Bar" },
  { id: "dashboard", name: "Dashboard" },
  { id: "reports", name: "Relatórios" },
];

// Função para gerar os itens de aba dinamicamente
// Recebe a aba ativa e a função de clique como parâmetros
export const generateTabItems = (activeTab, handleTabClick) =>
  tabs.map(({ id, name }) =>
    React.createElement(
      "li", // Cria um elemento <li> para cada aba
      {
        key: id, // Chave única para cada item (necessário para listas no React)
        id: `${id}_id`, // Define um ID único para o elemento
        className: `cursor-pointer hover:text-[#9A3379] transition duration-100 py-2 px-3 ${
          activeTab === `/${id}` ? "border-b border-[#9A3379] pb-2" : ""
        }`, // Aplica estilos dinâmicos com base na aba ativa
        onClick: () => handleTabClick(id), // Define o evento de clique para a aba
      },
      name // Conteúdo do <li> é o nome da aba
    )
  );

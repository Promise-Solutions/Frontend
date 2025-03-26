// Importa o hook useState do React para gerenciar estados locais
import { useState } from "react";
// Importa o React para usar a função createElement
import React from "react";

// Hook personalizado para gerenciar a lógica do filtro de tipos de usuário
export const useUserTypeFilterLogic = () => {
  // Define o estado inicial do filtro ativo como "1"
  const [activeFilter, setActiveFilter] = useState("1");
  // Define os filtros disponíveis como "Cliente" e "Interno"
  const filters = [
    { label: "Cliente", value: "1" },
    { label: "Interno", value: "2" },
  ];

  // Função para atualizar o filtro ativo ao clicar em um botão
  const handleFilterClick = (filterValue, onFilterChange) => {
    setActiveFilter(filterValue); // Atualiza o estado do filtro ativo
    if (onFilterChange) {
      onFilterChange(filterValue); // Notifica o componente pai sobre a mudança de filtro
    }
  };

  // Retorna o filtro ativo, a função de clique e a lista de filtros
  return { activeFilter, handleFilterClick, filters };
};

// Função para renderizar os botões de filtro dinamicamente
export const renderFilterButtons = (
  filters, // Lista de filtros disponíveis
  activeFilter, // Filtro atualmente ativo
  handleFilterClick // Função para lidar com cliques nos botões
) => {
  // Mapeia cada filtro para criar um botão correspondente
  return filters.map(({ label, value }) =>
    React.createElement(
      "button", // Cria um elemento do tipo botão
      {
        key: value, // Define uma chave única para cada botão
        onClick: () => handleFilterClick(value), // Define o evento de clique
        className: `cursor-pointer py-2 px-4 font-medium transition-all duration-200 ease-in-out relative ${
          activeFilter === value // Verifica se o botão é o filtro ativo
            ? "text-[#9A3379] border-b-2 border-[#9A3379]" // Estilo para o botão ativo
            : "text-white border-b-2 border-transparent hover:text-[#9A3379] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#9A3379] after:transform after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full" // Estilo para botões inativos
        }`,
      },
      label // Texto do botão (nome do filtro)
    )
  );
};

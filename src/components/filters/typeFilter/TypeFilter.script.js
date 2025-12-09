// Importa o hook useState do React para gerenciar estados locais
import { useState } from "react";
// Importa o React para usar a função createElement
import React from "react";

// Hook personalizado para gerenciar a lógica do filtro de tipos de usuário
export const useTypeFilterLogic = ( filters = [] ) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.value);
  
  const handleFilterClick = (filterValue, onFilterChange) => {
    setActiveFilter(filterValue);
    if (onFilterChange) {
      onFilterChange(filterValue);
    }
  };
  
  return { activeFilter, handleFilterClick };
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
            ? "text-pink-zero border-b-2 border-pink-zero" // Estilo para o botão ativo
            : "text-white border-b-2 border-transparent hover:text-pink-zero after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-pink-zero after:transform after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full" // Estilo para botões inativos
        }`,
      },
      label // Texto do botão (nome do filtro)
    )
  );
};
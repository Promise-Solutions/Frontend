// Importa o hook useState do React para gerenciar estados locais
import { useState, useEffect } from "react";
// Importa o React para usar a função createElement
import React from "react";
import { useUserContext } from "../../context/UserContext.jsx";


// Hook personalizado para gerenciar a lógica do filtro de tipos de usuário
export const useScreenFilterLogic = () => {
  // Define o estado inicial do filtro ativo como "1"
  const [activeFilter, setActiveFilter] = useState("1");
  const [filters, setFilters] = useState([]);
  const { isClient } = useUserContext();
  console.log(" useScreenFilterLogic isClient:", isClient)
  // Define os filtros disponíveis como "Cliente" e "Interno"


  useEffect(() => {
    if (isClient) {
      setFilters([
        { label: "Informações", value: "1" },
        { label: "Serviços", value: "2" },
        { label: "Dashboard", value: "3" },
      ]);
    } else {
      setFilters([
        { label: "Informações", value: "1" }
      ]);
    }
    console.log(filters)
  }, [isClient]);

  // Função para atualizar o filtro ativo ao clicar em um botão
  const handleFilterClick = (filterValue, onFilterChange) => {
    setActiveFilter(filterValue); // Update the active filter state
    if (onFilterChange) {
      onFilterChange(filterValue); // Notify parent of filter change
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
        className: `cursor-pointer py-2 px-4 font-medium transition-all duration-200 ease-in-out relative bg-[#1E1E1E90] rounded-t-[5px] ${
          activeFilter === value // Verifica se o botão é o filtro ativo
            ? "text-pink-zero border-b-2 border-pink-zero" // Estilo para o botão ativo
            : "text-white border-b-2 border-transparent hover:text-pink-zero after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-pink-zero after:transform after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full" // Estilo para botões inativos
        }`,
      },
      label // Texto do botão (nome do filtro)
    )
  );
};

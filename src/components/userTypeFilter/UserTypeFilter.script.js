import { useState } from "react"; // Importa useState para gerenciar o estado
import React from "react"; // Importa React para usar createElement

export const useUserTypeFilterLogic = () => {
  const [activeFilter, setActiveFilter] = useState("Clientes"); // Estado para o botão ativo
  const filters = ["Clientes", "Internos"]; // Lista de filtros disponíveis

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Atualiza o botão ativo
  };

  return { activeFilter, handleFilterClick, filters }; // Retorna os estados e funções
};

export const renderFilterButtons = (
  filters,
  activeFilter,
  handleFilterClick
) => {
  return filters.map((filter) =>
    React.createElement(
      "button",
      {
        key: filter,
        onClick: () => handleFilterClick(filter),
        className: `cursor-pointer py-2 px-4 font-medium transition-all duration-200 ease-in-out relative ${
          activeFilter === filter
            ? "text-[#9A3379] border-b-2 border-[#9A3379]"
            : "text-white border-b-2 border-transparent hover:text-[#9A3379] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#9A3379] after:transform after:-translate-x-1/2 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full"
        }`,
      },
      filter
    )
  );
};

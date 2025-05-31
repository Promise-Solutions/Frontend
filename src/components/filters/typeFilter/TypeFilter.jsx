import {
  useTypeFilterLogic,
  renderFilterButtons,
} from "./TypeFilter.script" // Importa a lógica e a função de renderização

const TypeFilter = ({ filters, onFilterChange }) => {
  const { activeFilter, handleFilterClick } = useTypeFilterLogic( filters); // Usa a lógica importada

  const handleClick = (filterValue) => {
    handleFilterClick(filterValue, onFilterChange); // Pass callback to notify parent
  };

  return (
    <div className="flex flex-row justify-center gap-36">
      {renderFilterButtons(filters, activeFilter, handleClick)}
      {/* Chama a função de renderização */}
    </div>
  );
};

export default TypeFilter;
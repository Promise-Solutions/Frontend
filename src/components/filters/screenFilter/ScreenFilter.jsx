import {
  useScreenFilterLogic,
  renderFilterButtons,
} from "./ScreenFilter.script.js"; // Importa a lógica e a função de renderização

const ScreenFilter = ({ onFilterChange }) => {
  const { activeFilter, handleFilterClick, filters } = useScreenFilterLogic(); // Usa a lógica importada

  const handleClick = (filterValue) => {
    handleFilterClick(filterValue, onFilterChange); // Pass callback to notify parent
  };

  return (
    <div className="flex flex-row justify-start gap-16">
      {/* Chama a função de renderização */}
      {renderFilterButtons(filters, activeFilter, handleClick)}{" "}
    </div>
  );
};

export default ScreenFilter;

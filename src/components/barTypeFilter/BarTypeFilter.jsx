import {
  useBarTypeFilterLogic, // Corrigido para usar lógica de Bar
  renderFilterButtons,
} from "./BarTypeFilter.script.js";

const BarTypeFilter = ({ onFilterChange }) => {
  const { activeFilter, handleFilterClick, filters } = useBarTypeFilterLogic(); // Corrigido para lógica de Bar

  const handleClick = (filterValue) => {
    handleFilterClick(filterValue, onFilterChange); // Pass callback to notify parent
  };

  return (
    <div className="flex flex-row justify-center gap-36">
      {renderFilterButtons(filters, activeFilter, handleClick)}
    </div>
  );
};

export default BarTypeFilter;

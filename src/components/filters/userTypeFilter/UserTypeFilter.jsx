import {
  useUserTypeFilterLogic,
  renderFilterButtons,
} from "./UserTypeFilter.script.js"; // Importa a lógica e a função de renderização

const UserTypeFilter = ({ onFilterChange }) => {
  const { activeFilter, handleFilterClick, filters } = useUserTypeFilterLogic(); // Usa a lógica importada

  const handleClick = (filterValue) => {
    handleFilterClick(filterValue, onFilterChange); // Pass callback to notify parent
  };

  return (
    <div className="flex flex-row justify-center gap-36">
      {renderFilterButtons(filters, activeFilter, handleClick)}{" "}
      {/* Chama a função de renderização */}
    </div>
  );
};

export default UserTypeFilter;

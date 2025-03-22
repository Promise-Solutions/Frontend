import { useUserTypeFilterLogic, renderFilterButtons } from "./UserTypeFilter.script.js"; // Importa a lógica e a função de renderização

const UserTypeFilter = () => {
  const { activeFilter, handleFilterClick, filters } = useUserTypeFilterLogic(); // Usa a lógica importada

  return (
    <div className="flex flex-row justify-center gap-36">
      {renderFilterButtons(filters, activeFilter, handleFilterClick)}{" "}
      {/* Chama a função de renderização */}
    </div>
  );
};

export default UserTypeFilter;

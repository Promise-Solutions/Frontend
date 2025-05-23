// Importa os componentes necessários
import CommandFilter from "../../components/filters/commandFilter/CommandFilter"; // Updated import
import BarTypeFilter from "../../components/filters/barTypeFilter/BarTypeFilter";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import ModalOpenCommand from "../../components/modals/modalOpenCommand/ModalOpenCommand"; // Import the new modal
import { renderCommands, stockRedirect } from "./Bar.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { useCommandContext } from "../../context/CommandContext"; // Importa o BarContext
import { SyncLoader } from "react-spinners";

const Bar = () => {
  const { setCommandId, findCommands } = useCommandContext(); // Obtém o setCommandId do contexto
  const [commandElements, setCommandElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("ABERTAS"); // Default to "ABERTAS"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [isOpenCommandModalOpen, setIsOpenCommandModalOpen] = useState(false); // State to control the modal
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const refreshCommands = async () => {
    try {
      const elements = await renderCommands(
        filterType,
        findCommands,
        setCommandId,
        navigate // Passa o navigate como argumento
      );
      setCommandElements(elements);
    } catch (error) {
      console.error("Erro ao renderizar comandas:", error);
    }
  };

  useEffect(() => {
    refreshCommands();
    setIsLoading(false);
  }, [filterType]); // Atualiza quando filterType muda

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter); // Atualiza diretamente com o valor correto ("ABERTAS" ou "FECHADAS")
  };

  const filteredCommandElements = commandElements.filter((element) => {
    const visibleFields = [
      element.props.name,
      element.props.employeeName,
      element.props.totalValue,
      element.props.discount,
      element.props.dateHourOpen,
      element.props.dateHourClose,
      element.props.commandNumber,
    ].map((field) =>
      String(field ?? "")
        .toUpperCase()
        .trim()
    );

    const term = searchTerm.toUpperCase().trim();

    return visibleFields.some((field) => field.includes(term));
  });

  const noResultsMessage =
    searchTerm && filteredCommandElements.length === 0 ? (
      <p className="text-center text-gray-400">
        Nenhum resultado encontrado para "{searchTerm}".
      </p>
    ) : null;

  return (
    <div className="min-w-full min-h-full text-white overflow-y-hidden">
      {/* Seção principal com filtros e cards */}
      <section className="mx-16 my-6">
        {/* Filtro de busca de comandas */}
        <div className="flex justify-center flex-col">
          {/* Filtro por tipo de comanda (Abertas ou Fechadas) */}
          <div className="flex w-full items-center gap-4 justify-between">
            <div>
              <h1 className="text-2xl font-thin">Gerencie seu bar</h1>
            </div>
            <PrimaryButton
              id="stock_button"
              text="Gerenciar Estoque"
              onClick={() => stockRedirect(navigate)} // Passa navigate para a função stockRedirect
            />
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t-1 border-gray-600">
            <div className="flex w-full flex-1 justify-center pl-75">
              <BarTypeFilter
                onFilterChange={handleFilterChange} // Passa a função corrigida
              />
            </div>
            <div className="flex gap-2 text-gray-400">
              <CommandFilter
                id="input_search_command" // Updated ID
                placeholder="Busque uma Comanda"
                onSearch={handleSearch} // Passa a função de busca
              />
              {/* Botão para abrir o modal de nova comanda */}
              <RegisterButton
                id="register_button"
                title="Registrar Comanda"
                text="+"
                onClick={() => setIsOpenCommandModalOpen(true)} // Open the modal
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center mt-[5rem]">
              <SyncLoader
                size={8}
                loading={true}
                color={"#02AEBA"}
                speedMultiplier={2}
              />
            </div>
          ) : (
            /* Espaço reservado para os cards de comandas */
            <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
              {filteredCommandElements.length > 0
                ? filteredCommandElements // Renderiza os elementos filtrados
                : noResultsMessage ||
                  (filterType === "ABERTAS" ? (
                    <p className="text-center text-gray-400">
                      Nenhuma comanda aberta encontrada.
                    </p>
                  ) : (
                    <p className="text-center text-gray-400">
                      Nenhuma comanda fechada encontrada.
                    </p>
                  ))}
            </div>
          )}
        </div>
      </section>
      {/* Modal for opening a new command */}
      <ModalOpenCommand
        isOpen={isOpenCommandModalOpen}
        onClose={() => setIsOpenCommandModalOpen(false)}
        onCommandAdded={refreshCommands} // Refresh commands on new command addition
      />
    </div>
  );
};

// Exportando o componente Bar para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Bar;

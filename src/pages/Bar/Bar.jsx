// Importa os componentes necessários
import UserFilter from "../../components/userFilter/UserFilter";
import BarTypeFilter from "../../components/barTypeFilter/BarTypeFilter";
import RegisterButton from "../../components/RegisterButton/RegisterButton";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import ModalOpenCommand from "../../components/modalOpenCommand/ModalOpenCommand"; // Import the new modal
import { renderCommands, stockRedirect } from "./Bar.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCommandContext } from "../../context/CommandContext"; // Importa o BarContext

// Componente funcional para a página Bar
// Representa a estrutura da página "Bar", atualmente sem conteúdo
const Bar = () => {
  const { setCommandId, findCommands } = useCommandContext(); // Obtém o setCommandId do contexto
  const [userElements, setUserElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("ABERTAS"); // Default to "ABERTAS"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [isOpenCommandModalOpen, setIsOpenCommandModalOpen] = useState(false); // State to control the modal

  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const elements = await renderCommands(
          filterType,
          findCommands,
          setCommandId,
          navigate
        );
        setUserElements(elements);
      } catch (error) {
        console.error("Erro ao renderizar comandas:", error);
      }
    };

    fetchAndRender();
  }, [filterType, setCommandId]); // Atualiza quando filterType ou setCommandId muda

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase()); // Atualiza o termo de busca
  };

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter === "1" ? "ABERTAS" : "FECHADAS"); // Map filter value to type
  };

  const filteredUserElements = userElements.filter((element) => {
    const name = element.props?.name?.toUpperCase(); // Verifica se name existe antes de chamar toUpperCase
    return name && name.includes(searchTerm); // Filtra apenas se name for válido
  });

  return (
    <div className="min-w-full min-h-full text-white overflow-y-hidden">
      {/* Seção principal com filtros e cards */}
      <section className="mx-16 my-6">
        {/* Filtro de busca de usuários */}
        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col">
          {/* Filtro por tipo de usuário (Clientes ou Internos) */}
          <div className="flex w-full justify-between">
            <div className="flex items-center w-[30%] gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-thin">Gerencie seu Bar</h1>
              </div>
              <PrimaryButton
                id="stock_button"
                text="Gerenciar Estoque"
                onClick={() => stockRedirect(navigate)} // Pass navigate to stockRedirect
              />
            </div>
            <div className="flex justify-center w-full pr-30 flex-1">
              <BarTypeFilter
                onFilterChange={handleFilterChange} // Pass updated callback
              />
            </div>
            <div className="flex gap-2 justify-end text-gray-400">
              <UserFilter
                id="input_search_user"
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
          {/* Espaço reservado para os cards de usuários */}
          <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
            {filteredUserElements.length > 0 ? (
              filteredUserElements
            ) : filterType === "ABERTAS" ? (
              <p className="text-center text-gray-400">
                Nenhuma comanda aberta encontrada.
              </p>
            ) : (
              <p className="text-center text-gray-400">
                Nenhuma comanda fechada encontrada.
              </p>
            )}
          </div>
        </div>
      </section>
      {/* Modal for opening a new command */}
      <ModalOpenCommand
        isOpen={isOpenCommandModalOpen}
        onClose={() => setIsOpenCommandModalOpen(false)}
      />
    </div>
  );
};

// Exportando o componente Bar para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Bar;

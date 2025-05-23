// Importa os componentes necessários
import UserFilter from "../../components/filters/userFilter/UserFilter";
import UserTypeFilter from "../../components/filters/userTypeFilter/UserTypeFilter";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import { registerRedirect, renderUsers } from "./Users.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { SyncLoader } from "react-spinners";

// Componente funcional para a página de gerenciamento de usuários
const Users = () => {
  const [userElements, setUserElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("CLIENTE"); // Default to "Cliente"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [isLoading, setIsLoading] = useState(true);
  const { findUsers, setUserId, setIsClient } = useUserContext(); // Adicionado setIsClient
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const elements = await renderUsers(
          filterType,
          findUsers,
          setUserId,
          setIsClient, // Passa setIsClient
          navigate
        );
        setUserElements(elements);
      } catch (error) {
        console.error("Erro ao renderizar usuários:", error);
      }
    };

    fetchAndRender();
    setIsLoading(false);
  }, [filterType]); // Atualiza quando filterType muda

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter === "1" ? "CLIENTE" : "FUNCIONARIO"); // Map filter value to type
  };

  const filteredUserElements = userElements.filter((element) => {
    const name = (element.props.name || "").toUpperCase().trim();
    const email = (element.props.email || "").toUpperCase().trim();
    const contact = (element.props.contact || "").toUpperCase().trim();
    const clientType = (element.props.clientType || "").toUpperCase().trim(); // Ensure clientType is included
    const term = searchTerm.toUpperCase().trim();

    return (
      name.includes(term) ||
      email.includes(term) ||
      contact.includes(term) ||
      clientType.includes(term) // Ensure clientType is part of the filter
    );
  });

  const noResultsMessage =
    searchTerm && filteredUserElements.length === 0 ? (
      <p className="text-center text-gray-400">
        Nenhum resultado encontrado para "{searchTerm}".
      </p>
    ) : null;

  return (
    <div className="min-w-full min-h-full text-white overflow-y-hidden">
      {/* Seção principal com filtros e cards */}
      <section className="mx-16 my-6">
        {/* Filtro de busca de usuários */}
        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col">
          {/* Filtro por tipo de usuário (Clientes ou Internos) */}
          <div className="flex w-full justify-between">
            <div className="flex pt-3 items-center">
              <h1 className="text-2xl font-thin">Gerencie seus usuários</h1>
            </div>
          </div>
          <div className="border-t-1 border-gray-600 mt-7 pt-4">
            <div className="flex w-full items-center">
              <div className="flex justify-center w-[100%] pl-75">
                <UserTypeFilter
                  onFilterChange={handleFilterChange} // Pass updated callback
                />
              </div>
              <div className="flex gap-2 justify-end text-gray-400">
                <UserFilter
                  id="input_search_user"
                  placeholder="Busque um Usuário"
                  onSearch={handleSearch} // Passa a função de busca
                />
                {/* Botão para cadastrar um novo usuário */}
                <RegisterButton
                  id="register_button"
                  title="Cadastrar Usuário"
                  text="+"
                  onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
                />
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-full w-full mt-[5rem]">
                <SyncLoader
                  size={8}
                  loading={true}
                  color={"#02AEBA"}
                  speedMultiplier={2}
                />
              </div>
            ) : (
              <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
                {filteredUserElements.length > 0
                  ? filteredUserElements // Ensure filtered elements are rendered
                  : noResultsMessage ||
                    (filterType === "CLIENTE" ? (
                      <p className="text-center text-gray-400">
                        Nenhum cliente encontrado.
                      </p>
                    ) : (
                      <p className="text-center text-gray-400">
                        Nenhum interno encontrado.
                      </p>
                    ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporta o componente para ser usado em outras partes do projeto
export default Users;

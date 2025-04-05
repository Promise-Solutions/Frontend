// Importa os componentes necessários
import UserFilter from "../../components/userFilter/UserFilter";
import UserTypeFilter from "../../components/userTypeFilter/UserTypeFilter";
import RegisterUserButton from "../../components/RegisterUserButton/RegisterUserButton";
import { registerRedirect, renderUsers } from "./Users.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";

// Componente funcional para a página de gerenciamento de usuários
const Users = () => {
  const [userElements, setUserElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("CLIENTE"); // Default to "Cliente"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

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
  }, [filterType]); // Atualiza quando filterType muda

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase()); // Atualiza o termo de busca
  };

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter === "1" ? "CLIENTE" : "FUNCIONARIO"); // Map filter value to type
  };

  const filteredUserElements = userElements.filter((element) => {
    const name = element.props.name.toUpperCase(); // Garante que o nome seja comparado em maiúsculas
    return name.includes(searchTerm); // Filtra os elementos com base no termo de busca
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
            <div className="flex items-center">
              <h1 className="text-2xl font-thin">Gerencie seus usuários</h1>
            </div>
            <div className="flex pl-14 justify-center w-[50%]">
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
              <RegisterUserButton
                id="register_button"
                text="+"
                onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
              />
            </div>
          </div>
          {/* Espaço reservado para os cards de usuários */}
          <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
            {filteredUserElements.length > 0 ? (
              filteredUserElements
            ) : filterType === "CLIENTE" ? (
              <p className="text-center text-gray-400">
                Nenhum cliente encontrado.
              </p>
            ) : (
              <p className="text-center text-gray-400">
                Nenhum interno encontrado.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporta o componente para ser usado em outras partes do projeto
export default Users;

// Importa os componentes necessários
import UserFilter from "../../components/filters/UserFilter";
import RegisterButton from "../../components/buttons/action/RegisterButton";
import { registerRedirect, renderUsers } from "./Users.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { SyncLoader } from "react-spinners";
import TypeFilter from "../../components/filters/typeFilter/TypeFilter";

// Componente funcional para a página de gerenciamento de usuários
const Users = () => {
  const [userElements, setUserElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("CLIENTES"); // Default to "CLIENTES"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [isLoading, setIsLoading] = useState(true);
  const { findUsers, setUserId, setIsClient } = useUserContext(); // Adicionado setIsClient
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página
  const userFilters = [
    {label: "Clientes", value: "CLIENTES"},
    {label: "Internos", value: "INTERNOS"}
  ]

  useEffect(() => {
    const fetchAndRender = async () => {
      setIsLoading(true); // Adicionado: inicia loading antes da requisição
      try {
        const elements = await renderUsers(
          filterType,
          findUsers,
          setUserId,
          setIsClient,
          navigate
        );
        setUserElements(elements);
      } catch (error) {
        console.error("Erro ao renderizar usuários:", error);
      }
      setIsLoading(false); // Adicionado: encerra loading após a requisição
    };

    fetchAndRender();
  }, [filterType]); // Atualiza quando filterType muda

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter); // Map filter value to type
  };

  const filteredUserElements = userElements
    .filter((element) => {
      const name = (element.props.name || "").toUpperCase().trim();
      const email = (element.props.email || "").toUpperCase().trim();
      const contact = (element.props.contact || "").toUpperCase().trim();
      const clientType = (element.props.clientType || "").toUpperCase().trim();
      const term = searchTerm.toUpperCase().trim();

      return (
        name.includes(term) ||
        email.includes(term) ||
        contact.includes(term) ||
        clientType.includes(term)
      );
    })
    .map((element) => {
      // Garante que a prop isBirthdayMonth seja passada para o CardUser
      if (element && element.type && element.props) {
        let isBirthdayMonth = false;
        if (element.props.birthDay) {
          // Considere apenas o mês
          const birthMonth = new Date(element.props.birthDay).getMonth();
          const nowMonth = new Date().getMonth();
          isBirthdayMonth = birthMonth === nowMonth;
        }
        // Retorna um novo elemento React com a prop isBirthdayMonth
        return {
          ...element,
          props: {
            ...element.props,
            isBirthdayMonth,
          },
        };
      }
      return element;
    });

  const noResultsMessage =
    searchTerm && filteredUserElements.length === 0 ? (
      <p className="text-center text-gray-400">
        Nenhum resultado encontrado para "{searchTerm}".
      </p>
    ) : null;

  return (
    <div className="slide-in-ltr min-w-full min-h-full text-white overflow-y-hidden">
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
                <TypeFilter
                  onFilterChange={handleFilterChange}
                  filters={userFilters}
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
                    (filterType === "CLIENTES" ? (
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

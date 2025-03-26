// Importa os componentes necessários
import UserFilter from "../../components/userFilter/UserFilter";
import UserTypeFilter from "../../components/userTypeFilter/UserTypeFilter";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import { registerRedirect, renderUsers } from "./Users.script";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUserContext } from "../../context/UserContext";

// Componente funcional para a página de gerenciamento de usuários
const Users = () => {
  const [userElements, setUserElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [filterType, setFilterType] = useState("1"); // Estado para o tipo de filtro
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [categories, setCategories] = useState([]); // Estado para categorias

  const { findUsers, setUserToken } = useUserContext(); // Exportação do contexto
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories"); // Use a URL completa se necessário
        setCategories(response.data);
      } catch (error) {
        console.error(
          "Erro ao buscar categorias:",
          error.response?.status,
          error.response?.statusText || error.message
        );
      }
    };

    fetchCategories();
  }, []); // Carrega as categorias apenas uma vez

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const elements = await renderUsers(
          filterType,
          findUsers,
          setUserToken,
          navigate,
          categories
        );
        setUserElements(elements);
      } catch (error) {
        console.error("Erro ao renderizar usuários:", error);
      }
    };

    if (categories.length > 0) {
      fetchAndRender();
    } else {
      console.log("Categorias ainda não carregadas."); // Log para depuração
    }
  }, [filterType, categories]); // Atualiza quando filterType ou categorias mudam

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase()); // Atualiza o termo de busca
  };

  const filteredUserElements = userElements.filter((element) => {
    const name = element.props.name.toUpperCase(); // Garante que o nome seja comparado em maiúsculas
    return name.includes(searchTerm); // Filtra os elementos com base no termo de busca
  });

  return (
    <div className="min-w-full min-h-full text-white pb-40">
      {/* Seção de cabeçalho com título e botão */}
      <section className="flex justify-center items-center mt-28">
        <div className="mr-10">
          <h1 className="text-[42px] font-bold">Gerencie seus usuários</h1>
          <p className="text-[18px] mb-4">
            Tenha uma visão geral de todos seus clientes cadastrados
          </p>
        </div>
        {/* Botão para cadastrar um novo usuário */}
        <PrimaryButton
          id="register_button"
          text="Cadastrar Usuário"
          onClick={registerRedirect}
        />
      </section>

      {/* Seção principal com filtros e cards */}
      <section className="px-16 mt-16">
        {/* Filtro de busca de usuários */}
        <div className="flex text-gray-400">
          <UserFilter
            id="input_search_user"
            placeholder="Busque um Usuário"
            onSearch={handleSearch} // Passa a função de busca
          />
        </div>

        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col mt-4">
          {/* Filtro por tipo de usuário (Clientes ou Internos) */}
          <UserTypeFilter onFilterChange={setFilterType} />{" "}
          {/* Atualiza o filtro */}
          {/* Espaço reservado para os cards de usuários */}
          <div className="gap-6 flex flex-wrap justify-center mt-12 max-h-[600px] overflow-y-auto w-full h-auto">
            {filteredUserElements.length > 0 ? (
              filteredUserElements
            ) : (
              <p className="text-center text-gray-400">
                Nenhum usuário encontrado.
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

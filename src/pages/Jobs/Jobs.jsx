// Componente funcional para a página Jobs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import JobsFilter from "../../components/JobFilter/JobFilter"
import { registerRedirect, renderJobs } from "./Jobs.script";
import { useJobContext } from "../../context/JobContext";
import RegisterButton from "../../components/RegisterButton/RegisterButton";

// Representa a estrutura da página "Jobs", atualmente sem conteúdo
const Jobs = () => {
    const [jobsElements, setJobsElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  const { findJobs } = useJobContext(); // Exportação do contexto
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página
  
  const fetchAndRender = async () => {
      const elements = await renderJobs(
          findJobs,
          navigate
      );
      console.log("elements", elements)
    setJobsElements(elements);
  };

  useEffect(() => {
    fetchAndRender();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase()); // Atualiza o termo de busca
  };

  const filteredJobsElements = jobsElements.filter((element) => {
    const title = element.props.title.toUpperCase(); // Garante que o nome seja comparado em maiúsculas
    return title.includes(searchTerm); // Filtra os elementos com base no termo de busca
  });

  return (
    <div className="min-w-full min-h-full text-white">
      {/* Seção de cabeçalho com título e botão */}
      <section className="flex flex-col justify-around items-center mx-16 mt-6">
      <div className="flex w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-thin">Gerencie seus serviços</h1>
            </div>
            <div className="flex gap-2 justify-end text-gray-400">
              <JobsFilter
                id="input_search_job"
                placeholder="Busque um Serviço"
                onSearch={handleSearch} // Passa a função de busca
              />
              {/* Botão para cadastrar um novo usuário */}
              <RegisterButton
                id="register_button"
                title="Cadastrar Serviço"
                text="+"
                // onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
              />
            </div>
          </div>

        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col">
          {/* Atualiza o filtro */}
          {/* Espaço reservado para os cards de usuários */}
          <div className="gap-6 flex flex-wrap justify-center mt-6 max-h-[600px] overflow-y-auto w-full h-auto">
            {filteredJobsElements.length > 0 ? (
              filteredJobsElements
            ) : (
              <p className="text-center text-gray-400">
                Nenhum serviço encontrado.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Exportando o componente Jobs para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Jobs;

// Componente funcional para a página Jobs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton/primaryButton";
import JobsFilter from "../../components/jobFilter/JobFilter"
import { registerRedirect, renderJobs } from "./Jobs.script";
import { useJobContext } from "../../context/JobContext";

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
      <section className="flex justify-around items-center mt-14">
        <div className="mr-10">
          <h1 className="text-[42px] font-bold tracking-widest">Atendimentos</h1>
          <p className="text-[18px] mb-4">
            Tenha uma visão geral de todos seus atendimentos já registrados
          </p>
        </div>
        {/* Botão para cadastrar um novo usuário */}
        <PrimaryButton
          id="register_button"
          text="Cadastrar Atendimento"
          onClick={registerRedirect}
        />
      </section>

      {/* Seção principal com filtros e cards */}
      <section className="px-16 mt-14">
        {/* Filtro de busca de usuários */}
        <div className="flex text-gray-400">
          <JobsFilter
            id="input_search_job"
            placeholder="Busque um Atendimento Cadastrado"
            onSearch={handleSearch} // Passa a função de busca
          />
        </div>

        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col mt-4">
          {/* Atualiza o filtro */}
          {/* Espaço reservado para os cards de usuários */}
          <div className="gap-6 flex flex-wrap justify-center mt-12 max-h-[600px] overflow-y-auto w-full h-auto">
            {filteredJobsElements.length > 0 ? (
              filteredJobsElements
            ) : (
              <p className="text-center text-gray-400">
                Nenhum atendimento encontrado.
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

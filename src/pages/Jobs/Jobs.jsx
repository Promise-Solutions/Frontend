// Componente funcional para a página Jobs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobsFilter from "../../components/filters/jobFilter/JobFilter"
import { registerRedirect, renderJobs } from "./Jobs.script";
import { useJobContext } from "../../context/JobContext";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import Table from "../../components/tables/Table";
import { useUserContext } from "../../context/UserContext"; 
import { SyncLoader } from "react-spinners";

// Representa a estrutura da página "Jobs", atualmente sem conteúdo
const Jobs = () => {
  const [jobsElements, setJobsElements] = useState([]); // Estado para armazenar os elementos renderizados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const { findClientById } = useUserContext();
  const { findJobs } = useJobContext(); // Exportação do contexto
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página
  
  const fetchAndRender = async () => {
      const elements = await renderJobs(
          findJobs,
          navigate,
          findClientById
      );


      console.log("elements", elements)
    setJobsElements(elements);
    setIsLoading(false);
  };
  
  const tableHeader = [
    { label: "ID", key: "id" },
    { label: "Titulo", key: "title" },
    { label: "Categoria", key: "category" },
    { label: "Tipo do Serviço", key: "jobType" },
    { label: "Cliente", key: "client"},
    { label: "Status", key: "isDone" },
    { label: "Ação", key: "action"}
  ] 

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase()); // Atualiza o termo de busca
  };
  
  const filteredJobsElements = jobsElements.filter((element) => {
    const title = element.title.toUpperCase(); // Garante que o nome seja comparado em maiúsculas
    return title.includes(searchTerm); // Filtra os elementos com base no termo de busca
  });
  
  useEffect(() => {
    fetchAndRender();
  }, []);
  
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
                onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
              />
            </div>
          </div>
        <div className="flex justify-center mt-4 flex-col">
          {isLoading ? 
          ( 
            <SyncLoader 
              size={8}
              loading={true}
              color={"#02AEBA"}
              speedMultiplier={2}
            />
          ):(
            <Table 
            headers={tableHeader}
            data={filteredJobsElements}
            />
          )
        }
        </div>
      </section>
    </div>
  );
};

// Exportando o componente Jobs para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Jobs;

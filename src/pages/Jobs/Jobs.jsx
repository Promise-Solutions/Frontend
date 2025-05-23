// Componente funcional para a página Jobs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobsFilter from "../../components/filters/jobFilter/JobFilter";
import { registerRedirect, renderJobs } from "./Jobs.script";
import { useJobContext } from "../../context/JobContext";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import Table from "../../components/tables/Table";
import { useUserContext } from "../../context/UserContext";
import { SyncLoader } from "react-spinners";
import {
  getCategoryTranslated,
  getServiceTypeTranslated,
  getStatusTranslated,
} from "../../hooks/translateAttributes";

// Representa a estrutura da página "Jobs", atualmente sem conteúdo
const Jobs = () => {
  const [allJobsElements, setAllJobsElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const { findClientById } = useUserContext();
  const { findJobs } = useJobContext(); // Exportação do contexto
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); //Navigate para navegatação, ele não atualiza a página

  const fetchAndRender = async () => {
    const elements = await renderJobs(findJobs, navigate, findClientById);
    setAllJobsElements(elements);
    setIsLoading(false);
  };

  const tableHeader = [
    { label: "Cliente", key: "client" },
    { label: "Titulo", key: "title" },
    { label: "Categoria", key: "category" },
    { label: "Tipo do Serviço", key: "serviceType" },
    { label: "Valor Total (R$)", key: "totalValue" },
    { label: "Status", key: "status" },
    { label: "Ação", key: "action" },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const filteredJobsElements = allJobsElements.filter((job) => {
    const title = (job.title || "").toUpperCase().trim();
    const client = (job.client || "").toUpperCase().trim();
    const category = (getCategoryTranslated(job.category) || "")
      .toUpperCase()
      .trim();
    const serviceType = (getServiceTypeTranslated(job.serviceType) || "")
      .toUpperCase()
      .trim();
    const clientType = (job.clientType || "").toUpperCase().trim(); // Ensure clientType is included
    const status = (getStatusTranslated(job.status) || "").toUpperCase().trim();
    const valor = (
      `R$${job.totalValue.toFixed(2).replace(".", ",").toString()}` || ""
    ).trim();

    const term = searchTerm.toUpperCase().trim();

    return (
      title.includes(term) ||
      client.includes(term) ||
      category.includes(term) ||
      serviceType.includes(term) ||
      status.includes(term) ||
      clientType.includes(term) ||
      valor.includes(term)
    );
  });

  useEffect(() => {
    fetchAndRender();
  }, []);

  return (
    <div className="slide-in-ltr min-w-full min-h-full text-white">
      {/* Seção de cabeçalho com título e botão */}
      <section className="flex flex-col justify-around items-center mx-16 mt-6">
        <div className="flex flex-col md:flex-row w-full justify-between">
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
        <div className="flex justify-center items-center w-full mt-4 flex-col">
          {isLoading ? (
            <SyncLoader
              size={8}
              loading={true}
              color={"#02AEBA"}
              speedMultiplier={2}
            />
          ) : (
            <Table
              headers={tableHeader}
              data={filteredJobsElements.map((job) => ({
                ...job,
                category: getCategoryTranslated(job.category),
                serviceType: getServiceTypeTranslated(job.serviceType),
                status: getStatusTranslated(job.status),
                totalValue: `R$ ${job.totalValue.toFixed(2).replace(".", ",")}`,
              }))}
              elementMessageNotFound="serviço"
            />
          )}
        </div>
      </section>
    </div>
  );
};

// Exportando o componente Jobs para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Jobs;

// Componente funcional para a página Jobs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobsFilter from "../../components/filters/JobFilter";
import { registerRedirect } from "./Jobs.script";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";
import { ROUTERS } from "../../constants/routers.js";
import { useJobContext } from "../../context/JobContext";
import RegisterButton from "../../components/buttons/action/RegisterButton.jsx";
import Table from "../../components/tables/Table";
import { useUserContext } from "../../context/UserContext";
import { SyncLoader } from "react-spinners";
import {
  getCategoryTranslated,
  getServiceTypeTranslated,
  getStatusTranslated,
} from "../../hooks/translateAttributes";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx"; // Adicionado Breadcrumbs
import { getBRCurrency } from "../../hooks/formatUtils.js";
import Pagination from "../../components/pagination/pagination.jsx";

const Jobs = () => {
  const [allJobsElements, setAllJobsElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { findClientById } = useUserContext();
  const { findJobs } = useJobContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAndRender = async (page = 1) => {
    setIsLoading(true);
    const size = 6;
    const response = await findJobs(size, page - 1);
    // Monta os campos client e action para cada job
    const jobsWithClient = await Promise.all(
      (response.content || []).map(async (job) => {
        let clientName = "Desconhecido";
        if (job.fkClient && findClientById) {
          const client = await findClientById(job.fkClient);
          if (client && client.name) clientName = client.name;
        }
        return {
          ...job,
          client: clientName,
          action: (
            <PrimaryButton
              id="access_button"
              text="Acessar"
              onClick={() => {
                navigate(ROUTERS.getJobDetail(job.id));
                sessionStorage.setItem("jobId", job.id);
              }}
            />
          ),
        };
      })
    );
    setAllJobsElements(jobsWithClient);
    setTotalPages(response.totalPages || 1);
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
    const clientType = (job.clientType || "").toUpperCase().trim();
    const status = (getStatusTranslated(job.status) || "").toUpperCase().trim();
    const valor = (getBRCurrency(job.totalValue) || "").trim();
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
    fetchAndRender(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="slide-in-ltr min-w-full min-h-full text-white">
      <section className="flex flex-col justify-around items-center mx-16 mt-6">
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-thin pt-3">Gerencie seus serviços</h1>
          </div>
        </div>
        <div className="flex gap-2 justify-between text-gray-400 border-t-1 border-gray-600 pt-4 mt-7 w-full">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
          <div className="flex row justify-between gap-4">
            <JobsFilter
              id="input_search_job"
              placeholder="Busque um Serviço"
              onSearch={handleSearch}
            />
            <RegisterButton
              id="register_button"
              title="Cadastrar Serviço"
              text="+"
              onClick={() => registerRedirect(navigate)}
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
            <>
              <Table
                headers={tableHeader}
                data={filteredJobsElements.map((job) => ({
                  ...job,
                  category: getCategoryTranslated(job.category),
                  serviceType: getServiceTypeTranslated(job.serviceType),
                  status: getStatusTranslated(job.status),
                  totalValue: getBRCurrency(job.totalValue),
                }))}
                messageNotFound="Nenhum serviço encontrado"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;

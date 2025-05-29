import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTERS } from "../../constants/routers";
import { axiosProvider } from "../../provider/apiProvider";
import { ENDPOINTS } from "../../constants/endpoints";

const PATH_LABELS = {
  [ROUTERS.USERS]: "Usuários",
  [ROUTERS.JOBS]: "Serviços",
  [ROUTERS.BAR]: "Bar",
  [ROUTERS.BAR_STOCK]: "Estoque",
  [ROUTERS.EXPENSES]: "Despesas",
  [ROUTERS.TASKS]: "Tarefas",
  [ROUTERS.DASHBOARD]: "Análise",
  [ROUTERS.REPORTS]: "Relatórios",
  [ROUTERS.CALENDAR]: "Calendário",
  "/register": "Cadastro",
  "/register/jobs": "Cadastrar Serviço",
  "/register/expenses": "Cadastrar Despesa",
  "/jobs": "Serviços",
  "/jobs/:jobId": "Detalhe do Serviço",
  "/jobs/:jobId/register/subjobs": "Cadastrar Subserviço",
  "/user/:userParam": "Detalhe do Usuário",
  "/user/:userParam/register/jobs": "Registrar Serviço para Usuário",
  "/command/:command": "Comanda",
};

function getLabel(path) {
  // Remove params
  const clean = path.replace(/\/\d+|\/:[^/]+/g, (match) =>
    match.startsWith("/:") ? match : ""
  );
  return PATH_LABELS[clean] || clean.replace("/", "");
}

const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname, state } = location;
  const params = useParams();

  // States for dynamic labels
  const [userName, setUserName] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [commandNumber, setCommandNumber] = useState(null);

  // Busca nome do usuário se estiver na rota de usuário
  useEffect(() => {
    const userParam = params.userParam;
    if (userParam && !userName) {
      // Tenta pegar do state de navegação
      if (state && state.userName) {
        setUserName(state.userName);
        return;
      }
      // Busca via API se não veio no state
      axiosProvider
        .get(`/clients/${userParam}`)
        .then((res) => setUserName(res.data?.name))
        .catch(() => {
          axiosProvider
            .get(`/employees/${userParam}`)
            .then((res2) => setUserName(res2.data?.name))
            .catch(() => setUserName(null));
        });
    }
  }, [params.userParam, state, userName]);

  // Busca nome do serviço se estiver na rota de serviço
  useEffect(() => {
    const jobId = params.jobId;
    if (jobId && !jobTitle) {
      axiosProvider
        .get(ENDPOINTS.getJobById(jobId))
        .then((res) => setJobTitle(res.data?.title))
        .catch(() => setJobTitle(null));
    }
  }, [params.jobId, jobTitle]);

  // Busca número da comanda se estiver na rota de comanda
  useEffect(() => {
    const commandId = params.command;
    if (commandId && !commandNumber) {
      axiosProvider
        .get(ENDPOINTS.getCommandById(commandId))
        .then((res) => setCommandNumber(res.data?.commandNumber))
        .catch(() => setCommandNumber(null));
    }
  }, [params.command, commandNumber]);

  // Só mostra breadcrumbs se houver param relevante
  if (!params.userParam && !params.jobId && !params.command) return null;

  // Serviços > Nome do Serviço
  if (params.jobId) {
    return (
      <nav className="text-sm mb-2 mt-2 ml-2 flex items-center gap-1">
        <Link to={ROUTERS.JOBS} className="hover:underline text-white/80">
          Serviços
        </Link>
        <span className="mx-2 text-white/40">{">"}</span>
        <span className="text-cyan-zero font-semibold">
          {jobTitle || "Serviço"}
        </span>
      </nav>
    );
  }

  // Usuários > Nome do Usuário
  if (params.userParam) {
    return (
      <nav className="text-sm mb-2 mt-2 ml-2 flex items-center gap-1">
        <Link to={ROUTERS.USERS} className="hover:underline text-white/80">
          Usuários
        </Link>
        <span className="mx-2 text-white/40">{">"}</span>
        <span className="text-cyan-zero font-semibold">
          {userName || "Usuário"}
        </span>
      </nav>
    );
  }

  // Comandas > Número da Comanda
  if (params.command) {
    return (
      <nav className="text-sm mb-2 mt-2 ml-2 flex items-center gap-1">
        <Link to={ROUTERS.BAR} className="hover:underline text-white/80">
          Comandas
        </Link>
        <span className="mx-2 text-white/40">{">"}</span>
        <span className="text-cyan-zero font-semibold">
          {commandNumber ? `Comanda: ${commandNumber}` : "Comanda"}
        </span>
      </nav>
    );
  }

  return null;
};

export default Breadcrumbs;

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
  const [commandNumber, setCommandNumber] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);

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

  // Busca número da comanda se estiver na rota de command
  useEffect(() => {
    const commandId = params.command;
    if (commandId && !commandNumber) {
      // Tenta pegar do state de navegação
      if (state && state.commandNumber) {
        setCommandNumber(state.commandNumber);
        return;
      }
      // Busca via API se não veio no state
      axiosProvider
        .get(ENDPOINTS.getCommandById(commandId))
        .then((res) => setCommandNumber(res.data?.commandNumber))
        .catch(() => setCommandNumber(null));
    }
  }, [params.command, state, commandNumber]);

  // Busca nome do serviço se estiver na rota de serviço
  useEffect(() => {
    const jobId = params.jobId;
    if (jobId) {
      axiosProvider
        .get(ENDPOINTS.getJobById(jobId))
        .then((res) => setJobTitle(res.data?.title))
        .catch(() => setJobTitle(null));
    }
  }, [params.jobId, jobTitle]);

  const pathParts = pathname.split("/").filter(Boolean);
  let pathAcc = "";
  let userParamUsed = false;
  let commandParamUsed = false;
  let jobParamUsed = false;

  // Gera breadcrumbs com links para as páginas de listagem e label dinâmico para detalhes
  const crumbs = [];
  for (let idx = 0; idx < pathParts.length; idx++) {
    const part = pathParts[idx];
    pathAcc += "/" + part;

    // Usuário
    if (params.userParam && part === params.userParam && !userParamUsed) {
      userParamUsed = true;
      // Link para lista de usuários
      crumbs.push(
        <span key="users-link">
          <Link to={ROUTERS.USERS} className="hover:underline text-white/80">
            Usuários
          </Link>
          <span className="mx-2 text-white/40">{">"}</span>
        </span>
      );
      // Nome do usuário
      crumbs.push(
        <span key={part} className="text-cyan-zero font-semibold">
          {userName || "Usuário"}
        </span>
      );
      continue;
    }
    // Comanda
    if (params.command && part === params.command && !commandParamUsed) {
      commandParamUsed = true;
      crumbs.push(
        <span key="bar-link">
          <Link to={ROUTERS.BAR} className="hover:underline text-white/80">
            Bar
          </Link>
          <span className="mx-2 text-white/40">{">"}</span>
        </span>
      );
      crumbs.push(
        <span key={part} className="text-cyan-zero font-semibold">
          {commandNumber ? `Comanda: ${commandNumber}` : "Comanda"}
        </span>
      );
      continue;
    }
    // Serviço
    if (params.jobId && part === params.jobId && !jobParamUsed) {
      jobParamUsed = true;
      crumbs.push(
        <span key="jobs-link">
          <Link to={ROUTERS.JOBS} className="hover:underline text-white/80">
            Serviços
          </Link>
          <span className="mx-2 text-white/40">{">"}</span>
        </span>
      );
      crumbs.push(
        <span key={part} className="text-cyan-zero font-semibold">
          {jobTitle ? jobTitle : "Serviço"}
        </span>
      );
      continue;
    }
    // Listagem (ex: /jobs, /users, etc)
    // Só mostra se for a última parte OU se não for id/uuid
    const isIdOrUuid = /^\d+$/.test(part) || /^[0-9a-fA-F-]{16,}$/.test(part);
    if (!isIdOrUuid && !params.userParam && !params.command && !params.jobId) {
      const label = getLabel(pathAcc) || part;
      const isLast = idx === pathParts.length - 1;
      crumbs.push(
        isLast ? (
          <span key={pathAcc} className="text-cyan-zero font-semibold">
            {label}
          </span>
        ) : (
          <span key={pathAcc}>
            <Link to={pathAcc} className="hover:underline text-white/80">
              {label}
            </Link>
            <span className="mx-2 text-white/40">{">"}</span>
          </span>
        )
      );
    }
  }

  // Só mostra breadcrumbs se houver crumbs
  if (!crumbs.length) return null;

  return (
    <nav className="text-sm mb-2 mt-2 ml-2 flex items-center gap-1">
      {/* Removido o link "Início" */}
      {crumbs}
    </nav>
  );
};

export default Breadcrumbs;

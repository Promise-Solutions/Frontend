import { useEffect } from "react";
import CardHomePage from "../../components/cards/cardHomePage/CardHomePage.jsx";
import { useNavigate } from "react-router-dom";
import { handleButtonClick } from "../../components/cards/cardHomePage/CardHome.script.js";
import UserIcon from "../../assets/iconsHomePage/icon-empresa.png";
import JobIcon from "../../assets/iconsHomePage/icon-servicos.png";
import BarIcon from "../../assets/iconsHomePage/icon-bar.png";
import DashIcon from "../../assets/iconsHomePage/icon-dashboard.png";
import RelatIcon from "../../assets/iconsHomePage/icon-report.png";
import TaskIcon from "../../assets/iconsHomePage/icon-tarefas.png";
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import LogoutButton from "../../components/buttons/logoutButton/LogoutButton.jsx";

// Componente funcional para a página Home
// Representa a estrutura da página inicial
const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center min-h-[100vh] h-full w-[100vw] relative">
      <div className="flex items-center justify-center">
        <img src={Logo} className="h-[130px]" />
        <div className="absolute flex w-full justify-end  pr-[64px] py-4 px-12">
          <LogoutButton
            id="logout_button_id"
            text="Sair do Usuário"
            onClick={() => handleLogout(navigate)}
            />
        </div>
      </div>
      <section className="flex flex-wrap w-auto max-w-[75vw] h-auto gap-4 items-center justify-center mx-4">
        <CardHomePage
          title="Usuários"
          text="Gerencie seus usuários, serviços e tarefas"
          url={UserIcon}
          idButton="users"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("users", navigate)}
        />
        <CardHomePage
          title="Serviços"
          text="Gerencie seus serviços e Sub-serviços"
          url={JobIcon}
          idButton="jobs"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("jobs", navigate)}
        />
        <CardHomePage
          title="Bar"
          text="Visualize e gerencie as comandas e pedidos dos seus clientes"
          url={BarIcon}
          idButton="bar"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("bar", navigate)}
        />
        <CardHomePage
          title="Dashboard"
          text="Acompanhe dados, métricas e tendências em tempo real"
          url={DashIcon}
          idButton="dashboard"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("dashboard", navigate)}
        />
        <CardHomePage
          title="Relatórios"
          text="Visualize seus relatórios mensais ou gere um novo quando quiser"
          url={RelatIcon}
          idButton="reports"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("reports", navigate)}
        />
        <CardHomePage
          title="Tarefas"
          text="Obtenha uma visão de suas tarefas e gerencie seus status "
          url={TaskIcon}
          idButton="reports"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick("reports", navigate)}
        />
      </section>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

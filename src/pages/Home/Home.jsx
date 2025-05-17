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
import StockIcon from '../../assets/iconsHomePage/icon-estoque.png';
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import LogoutButton from "../../components/buttons/logoutButton/LogoutButton.jsx";
import { ROUTERS } from "../../constants/routers.js";

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
            text="Sair"
            onClick={() => handleLogout(navigate)}
            />
        </div>
      </div>
      <section className="flex flex-wrap w-auto max-w-[75vw] h-auto gap-4 items-center justify-left mx-4">
        <CardHomePage
          title="Usuários"
          text="Gerencie seus usuários e visualize seus serviços e indicadores"
          url={UserIcon}
          idButton={ROUTERS.USERS}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.USERS, navigate)}
        />
        <CardHomePage
          title="Serviços"
          text="Gerencie seus serviços e subserviços registrados"
          url={JobIcon}
          idButton={ROUTERS.JOBS}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.JOBS, navigate)}
        />
        <CardHomePage
          title="Bar"
          text="Visualize e gerencie as comandas e pedidos dos seus clientes"
          url={BarIcon}
          idButton={ROUTERS.BAR}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.BAR, navigate)}
        />
        <CardHomePage
          title="Análise"
          text="Acompanhe dados, métricas e tendências em tempo real"
          url={DashIcon}
          idButton={ROUTERS.DASHBOARD}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.DASHBOARD, navigate)}
        />
        <CardHomePage
          title="Relatórios"
          text="Visualize seus relatórios existentes ou gere novos"
          url={RelatIcon}
          idButton={ROUTERS.REPORTS}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.REPORTS, navigate)}
        />
        <CardHomePage
          title="Tarefas"
          text="Obtenha uma visão de suas tarefas e gerencie seus status"
          url={TaskIcon}
          idButton={ROUTERS.TASKS}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.TASKS, navigate)}
        />
        <CardHomePage
          title="Estoque"
          text="Visualize e gerencie os produtos presentes em seu estoque"
          url={StockIcon}
          idButton={ROUTERS.BAR_STOCK}
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
          onClick={() => handleButtonClick(ROUTERS.BAR_STOCK, navigate)}
        />
      </section>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

import { useEffect } from "react";
import CardHomePage from "../../components/CardHomePage/CardHomePage.jsx";
import UserIcon from "../../assets/icon-empresa.png";
import JobIcon from "../../assets/icon-servicos.png";
import BarIcon from "../../assets/icon-bar.png";
import DashIcon from "../../assets/icon-dashboard.png";
import RelatIcon from "../../assets/icon-report.png";
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";

// Componente funcional para a página Home
// Representa a estrutura da página inicial
const Home = () => {
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (nav) {
      nav.style.display =
        window.location.pathname === "/home" || "/" ? "none" : "flex";
    }
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-[100vh] w-[100vw] relative">
      <div className="flex w-full justify-end mx-4 mr-[64px] py-4 px-12">
        <LogoutButton
          id="logout_button_id"
          text="Sair do Usuário"
          onClick={handleLogout}
        />
      </div>
      <img src={Logo} className="h-[170px]" />
      <section className="flex w-[95vw] h-[65%] gap-4 items-center justify-between mx-4">
        <CardHomePage
          title="Usuários"
          text="Gerencie seus usuários, serviços e tarefas"
          url={UserIcon}
          idButton="users"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
        />
        <CardHomePage
          title="Serviços"
          text="Gerencie seus serviços e Sub-serviços"
          url={JobIcon}
          idButton="jobs"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
        />
        <CardHomePage
          title="Bar"
          text="Visualize e gerencie as comandas e pedidos dos seus clientes"
          url={BarIcon}
          idButton="bar"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
        />
        <CardHomePage
          title="Dashboard"
          text="Acompanhe dados, métricas e tendências em tempo real"
          url={DashIcon}
          idButton="dashboard"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
        />
        <CardHomePage
          title="Relatórios"
          text="Visualize seus relatórios mensais ou gere um novo quando quiser"
          url={RelatIcon}
          idButton="reports"
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
        />
      </section>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

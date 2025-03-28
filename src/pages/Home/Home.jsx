import { useEffect } from "react";
import CardHomePage from "../../components/HomePage/CardHomePage";
import UserIcon from "../../assets/icon-empresa.png";
import BarIcon from "../../assets/icon-bar.png";
import DashIcon from "../../assets/icon-dashboard.png";
import RelatIcon from "../../assets/icon-report.png";
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton.jsx";

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
      <div className="flex w-full justify-end mx-4 mr-[64px] py-4 px-7">
        <SecondaryButton
          id="logout_button_id"
          text="Sair do Usuário"
          onClick={handleLogout}
        />
      </div>
      <img src={Logo} className="h-[170px]" />
      <section className="flex w-[95vw] h-[65%] gap-4 items-center justify-between mx-4">
        <CardHomePage
          title="Gerencie seus usuários"
          text="Gerencie seus usuários, atendimentos e tarefas"
          url={UserIcon}
          idButton="users"
        />
        <CardHomePage
          title="Bar"
          text="Visualize e gerencie as comandas e pedidos dos seus clientes"
          url={BarIcon}
          idButton="bar"
        />
        <CardHomePage
          title="Dashboard"
          text="Acompanhe dados, métricas e tendências em tempo real"
          url={DashIcon}
          idButton="dashboard"
        />
        <CardHomePage
          title="Relatórios"
          text="Visualize seus relatórios mensais ou gere um novo quando quiser"
          url={RelatIcon}
          idButton="reports"
        />
      </section>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

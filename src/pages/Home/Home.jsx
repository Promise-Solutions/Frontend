import { useEffect } from "react";
import CardHomePage from "../../components/homePage/CardHomePage.jsx";
import UserIcon from '../../assets/icon-empresa.png'
import JobIcon from '../../assets/icon-atendimentos.png';
import BarIcon from '../../assets/icon-bar.png'
import DashIcon from '../../assets/icon-dashboard.png'
import RelatIcon from '../../assets/icon-report.png'
import Logo from '../../assets/logo-branco-bg-sonoro.png'
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
      <LogoutButton className="absolute top-3 right-0"/>
      <img src={Logo} className="h-[170px]" />
      <section className="flex w-[97vw] h-[65%] items-center justify-between">
        <CardHomePage title="Usuários" text="Tenha uma visualização dos seus usuários cadastrados e os gerencie" url={UserIcon} idButton="users" />
        <CardHomePage title="Atendimentos" text="Acesse para gerir e visualizar seus atendimentos registrados" url={JobIcon} idButton="jobs" />
        <CardHomePage title="Bar" text="Visualize e gerencie as comandas e pedidos dos seus clientes" url={BarIcon} idButton="bar" />
        <CardHomePage  title="Dashboard" text="Acompanhe dados, métricas e tendências em tempo real" url={DashIcon} idButton="dashboard" />
        <CardHomePage title="Relatórios" text="Visualize seus relatórios mensais ou gere um novo quando quiser" url={RelatIcon} idButton="reports" />
      </section>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

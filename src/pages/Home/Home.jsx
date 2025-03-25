import { useEffect } from "react";
import CardHomePage from "../../components/HomePage/CardHomePage";
import UserIcon from '../../assets/icon-empresa.png'
import BarIcon from '../../assets/icon-bar.png'
import DashIcon from '../../assets/icon-dashboard.png'
import RelatIcon from '../../assets/icon-report.png'
import Logo from '../../assets/logo-branco-bg-sonoro.png'
import { handleLogout } from "./Home.script.js";

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
      <button
        id="logout_button_id"
        className="LogoutBtn text-[cyan] font-medium border border-solid border-[cyan] cursor-pointer 
        py-4 px-7 inline-block hover:text-[#9A3379] hover:border-[#9A3379] transition duration-100 absolute top-5 right-5"
        onClick={handleLogout}
      >
        Sair do Usuário
      </button>
      <img src={Logo} className="h-[170px]" />
      <section className="flex w-[95vw] h-[65%] items-center justify-between">
        <CardHomePage title="Gerencie seus usuários" text="Gerencie seus usuários, atendimentos e tarefas" url={UserIcon} idButton="users" />
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

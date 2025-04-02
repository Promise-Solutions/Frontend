import { useNavbarLogic, generateTabItems } from "./Navbar.script.js"; // Importa lógica e gerador de abas
import logo from "../../assets/logo-branco-bg-sonoro.png"; // Importa o logo
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

// Componente funcional Navbar
const Navbar = () => {
  // Usa o hook personalizado para obter estados e funções
  const { activeTab, handleTabClick, handleLogout } = useNavbarLogic();

  return (
    <div className="navbar bg-[transparent] px-16 w-full flex justify-between items-center cursor-pointer shadow-md shadow-white/5">
      <img
        id="logo_id"
        src={logo}
        alt="Studio Zero"
        className="w-[156px] h-[79px]"
      />
      {/* Lista de abas do Navbar */}
      <ul className="flex justify-between gap-6 w-[40%] items-center h-full text-white font-medium">
        {generateTabItems(activeTab, handleTabClick)}
        {/* 
          Gera os itens dinamicamente:
          - `activeTab`: Determina qual aba está ativa para aplicar estilos.
          - `handleTabClick`: Callback para tratar cliques nas abas.
        */}
      </ul>
      {/* Botão de logout */}
      <div className="">
        <LogoutButton
          id="logout_button_id"
          text="Sair do Usuário"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navbar; // Exporta o componente para uso em outros lugares

import { useNavbarLogic, generateTabItems } from "./Navbar.script.js"; // Importa lógica e gerador de abas
import logo from "../../assets/logo-branco-bg-sonoro.png"; // Importa o logo

// Componente funcional Navbar
const Navbar = () => {
  // Usa o hook personalizado para obter estados e funções
  const { activeTab, handleTabClick, handleLogout } = useNavbarLogic();

  return (
    <div className="navbar bg-black bg-gradient-to-r from-[#9A337933] via-[#00000033] to-[#00EFFF33] border-b-white border border-solid flex justify-between items-center">
      <img
        src={logo}
        alt="Studio Zero"
        className="w-[156px] h-[79px] ml-[64px]"
      />
      {/* Lista de abas do Navbar */}
      <ul className="flex justify-between gap-6 w-[350px] items-center h-full text-white font-medium">
        {generateTabItems(activeTab, handleTabClick)}
        {/* 
          Gera os itens dinamicamente:
          - `activeTab`: Determina qual aba está ativa para aplicar estilos.
          - `handleTabClick`: Callback para tratar cliques nas abas.
        */}
      </ul>
      {/* Botão de logout */}
      <button
        id="logout_button_id"
        className="navBarBtn text-[cyan] font-medium border border-solid border-[cyan] cursor-pointer mx-4 mr-[64px] py-4 px-7 inline-block hover:text-[#9A3379] hover:border-[#9A3379] transition duration-100"
        onClick={handleLogout}
      >
        Sair do Usuário {/* Texto exibido no botão */}
      </button>
    </div>
  );
};

export default Navbar; // Exporta o componente para uso em outros lugares

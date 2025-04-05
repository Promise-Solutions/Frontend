import { useEffect } from "react"; // Import useEffect
import {
  useNavbarLogic,
  generateTabItems,
  initializeLogoClick,
} from "./Navbar.script.js"; // Import initializeLogoClick
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../../assets/logo-branco-bg-sonoro.png"; // Importa o logo
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

// Componente funcional Navbar
const Navbar = () => {
  const { activeTab, handleTabClick, handleLogout } = useNavbarLogic();
  const navigate = useNavigate();

  useEffect(() => {
    initializeLogoClick(navigate); // Set up the logo click event
  }, [navigate]);

  return (
    <div className="navbar bg-[transparent] px-16 w-full flex justify-between items-center cursor-pointer shadow-md shadow-white/5">
      <img
        id="logo_id"
        src={logo}
        alt="Studio Zero"
        className="w-[156px] h-[79px]"
      />
      <ul className="flex justify-between gap-6 w-[40%] items-center h-full text-white font-medium">
        {generateTabItems(activeTab, handleTabClick)}
      </ul>
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

export default Navbar;

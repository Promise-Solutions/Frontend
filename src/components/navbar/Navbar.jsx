import { useEffect, useState } from "react";
import {
  useNavbarLogic,
  generateTabItems,
  initializeLogoClick,
} from "./Navbar.script.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-branco-bg-sonoro.png";
import LogoutButton from "../buttons/logoutButton/LogoutButton.jsx";
import { Menu, X } from "lucide-react"; // Ícones do menu

const Navbar = () => {
  const { activeTab, handleLogout } = useNavbarLogic();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    initializeLogoClick(navigate); // Clique no logo
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Fecha menu mobile ao trocar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [activeTab]);

  return (
    <nav className="navbar bg-transparent px-6 md:px-16 w-full flex justify-between items-center shadow-md shadow-white/5 text-white font-medium relative">
      {/* Logo */}
      <img
        id="logo_id"
        src={logo}
        alt="Studio Zero"
        className="w-[130px] md:w-[156px] h-[70px] md:h-[79px] cursor-pointer"
      />

      {/* Botão de menu (mobile) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Desktop */}
      <ul className="hidden md:flex gap-6 items-center h-full">
        {generateTabItems(activeTab)}
      </ul>

      {/* Botão logout (desktop) */}
      <div className="hidden md:block">
        <LogoutButton
          id="logout_button_id"
          text="Sair do Usuário"
          onClick={handleLogout}
        />
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#000000cc] flex flex-col items-center py-6 z-50 gap-4 md:hidden transition-all duration-200">
          {generateTabItems(activeTab)}
          <LogoutButton
            id="logout_button_id_mobile"
            text="Sair do Usuário"
            onClick={handleLogout}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

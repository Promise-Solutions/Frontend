import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";

// Tabs disponíveis
export const tabs = [
  { id: "calendar", name: "Calendário" },
  { id: "jobs", name: "Serviços" },
  { id: "tasks", name: "Tarefas" },   
  { id: "bar", name: "Bar" },
  { id: "bar/stock", name: "Estoque" },
  { id: "expenses", name: "Despesas" },
  { id: "dashboard", name: "Análises" },
  { id: "reports", name: "Relatórios" },
  { id: "users", name: "Usuários" },
];

// Hook da lógica da navbar
export const useNavbarLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const sortedTabs = [...tabs].sort((a, b) => b.id.length - a.id.length);
    const matchedTab = sortedTabs.find((tab) =>
      location.pathname.startsWith(`/${tab.id}`)
    );
    setActiveTab(matchedTab ? `/${matchedTab.id}` : "");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTERS.LOGIN);
  };

  return { activeTab, handleLogout };
};

// Gera os itens da navbar
export const generateTabItems = (activeTab) =>
  tabs.map(({ id, name }) => {
    const isActive = activeTab === `/${id}`;
    return (
      <Link
        key={id}
        to={`/${id}`}
        id={`${id}_id`}
        className={`cursor-pointer hover:text-[#9A3379] transition-all duration-100 ease-in-out py-2 px-3 relative
        ${isActive ? "text-[#9A3379]" : ""} 
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#9A3379] 
        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"} 
        after:transition-all after:duration-300 after:ease-in-out`}
      >
        {name}
      </Link>
    );
  });

// Clique no logo
const waitForLogo = (onLogoClick) => {
  const logo = document.getElementById("logo_id");
  if (logo) {
    logo.addEventListener("click", onLogoClick);
  }
};

export const initializeLogoClick = (navigate) => {
  waitForLogo(() => navigate(ROUTERS.HOME));
};

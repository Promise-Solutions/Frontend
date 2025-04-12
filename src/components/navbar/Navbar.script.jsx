import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Tabs disponíveis
export const tabs = [
  { id: "users", name: "Usuários" },
  { id: "jobs", name: "Serviços" },
  { id: "bar", name: "Bar" },
  { id: "dashboard", name: "Dashboard" },
  { id: "reports", name: "Relatórios" },
  { id: "tasks", name: "Tarefas" },
];

// Hook da lógica da navbar
export const useNavbarLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const matchedTab = tabs.find((tab) =>
      location.pathname.startsWith(`/${tab.id}`)
    );
    setActiveTab(matchedTab ? `/${matchedTab.id}` : "");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
  waitForLogo(() => navigate("/"));
};

// Função para tratar o logout

import { ROUTERS } from "../../../constants/routers";

// Redireciona o usuário para a página de login
export const handleLogout = (navigate) => {
  localStorage.clear();
  sessionStorage.clear();
  navigate(ROUTERS.LOGIN);
};

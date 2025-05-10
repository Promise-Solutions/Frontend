import { ROUTERS } from "../../constants/routers";

export const handleLogout = (navigate) => {
  localStorage.clear();
  sessionStorage.clear();
  navigate(ROUTERS.LOGIN); // Use navigate passed as an argument
};

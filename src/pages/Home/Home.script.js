export const handleLogout = (navigate) => {
  localStorage.clear();
  sessionStorage.clear();
  navigate("/login"); // Use navigate passed as an argument
};

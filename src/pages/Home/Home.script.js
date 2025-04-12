export const handleLogout = (navigate) => {
  localStorage.clear();
  navigate("/login"); // Use navigate passed as an argument
};

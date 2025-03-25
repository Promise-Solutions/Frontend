export const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };
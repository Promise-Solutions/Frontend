// Função para tratar o logout
// Redireciona o usuário para a página de login
export const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };
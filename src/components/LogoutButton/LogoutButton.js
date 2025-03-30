// Função para tratar o logout
// Redireciona o usuário para a página de login
export const handleLogout = () => {
  localStorage.clear();
    window.location.href = "/login";
  };
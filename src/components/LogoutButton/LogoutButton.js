// Função para tratar o logout
// Redireciona o usuário para a página de login
export const handleLogout = (navigate) => {
  localStorage.clear();
  seessionStorage.clear();
    navigate("/login");
  };
import React from "react";
import CardUser from "../../components/CardUser/CardUser.jsx";

export const registerRedirect = () => {
  window.location.href = "/register";
};

export const renderUsers = async (
  filterType,
  findUsers,
  setUserToken,
  navigate,
  categories // Adicionado parâmetro para categorias
) => {
  try {
    const users = await findUsers(filterType);

    return users.map((user) => {
      const categoryName =
        categories.find((cat) => cat.id === parseInt(user.categoria))?.name ||
        "Desconhecida";

      return React.createElement(CardUser, {
        key: user.token,
        id: user.id,
        name: user.nome,
        category: categoryName, // Usa o nome da categoria
        telefone: user.telefone,
        email: user.email,
        onClick: () => {
          setUserToken(user.token);
          navigate(`/user/${user.token}`); // redireciona sem recarregar a página
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

import React from "react";
import CardUser from "../../components/CardUser/CardUser.jsx";

export const registerRedirect = () => {
  window.location.href = "/register";
};

export const renderUsers = async (
  filterType,
  findUsers,
  setUserToken,
  navigate
) => {
  try {
    const users = await findUsers(filterType);

    return users.map((user) => {
      return React.createElement(CardUser, {
        key: user.token,
        id: user.id,
        name: user.nome,
        tipoCliente: user.tipoCliente, // Passa o tipoCliente diretamente
        ativo: user.ativo, // Pass ativo status
        telefone: user.telefone,
        email: user.email,
        onClick: () => {
          setUserToken(user.token);
          navigate(`/user/${user.token}`);
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

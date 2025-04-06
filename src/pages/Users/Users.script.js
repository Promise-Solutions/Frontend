import React from "react";
import CardUser from "../../components/cardUser/CardUser.jsx";

export const registerRedirect = (navigate) => {
  navigate("/register"); // Use navigate passed as an argument
};

export const renderUsers = async (
  filterType,
  findUsers,
  setUserId,
  setIsClient,
  navigate
) => {
  try {
    const users = await findUsers(filterType);

    return users.map((user) => {
      return React.createElement(CardUser, {
        key: user.id,
        id: user.id,
        name: user.nome,
        tipoCliente: user.tipoCliente, // Passa o tipoCliente diretamente
        ativo: user.ativo, // Pass ativo status
        contact: user.contato,
        email: user.email,
        onClick: () => {
          setUserId(user.id);
          const isClient = filterType === "CLIENTE";
          setIsClient(isClient);
          sessionStorage.setItem("userId", user.id);
          sessionStorage.setItem("isClient", isClient);
          navigate(`/user/${user.id}`);
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

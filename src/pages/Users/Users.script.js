import React from "react";
import CardUser from "../../components/cards/CardUser.jsx";
import { ROUTERS } from "../../constants/routers.js";

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
        name: user.name,
        clientType: filterType === "CLIENTES" ? user.clientType : undefined, // Ensure clientType is passed
        active: user.active,
        contact: user.contact,
        email: user.email,
        birthDay: user.birthDay, // Passa birthDay
        onClick: () => {
          setUserId(user.id);
          const isClient = filterType === "CLIENTES";
          setIsClient(isClient);
          navigate(ROUTERS.getUserDetail(user.id)); // Navega para a página do usuário
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

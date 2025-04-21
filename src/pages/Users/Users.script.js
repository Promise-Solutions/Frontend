import React from "react";
import CardUser from "../../components/cards/cardUser/CardUser.jsx";

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
        clientType: filterType === "CLIENTE" ? user.clientType : undefined, // Ensure clientType is passed
        active: user.active,
        contact: user.contact,
        email: user.email,
        onClick: () => {
          setUserId(user.id);
          const isClient = filterType === "CLIENTE";
          setIsClient(isClient);
          navigate(`/user/${user.id}`); // Navega para a página do usuário
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

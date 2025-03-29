import React from "react";
import CardUser from "../../components/CardUser/CardUser.jsx";
import toast from "react-hot-toast";

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
        tipoCliente: filterType === "CLIENTE" ? user.tipoCliente : null, // Only pass tipoCliente for clients
        ativo: user.ativo, // Pass ativo status
        telefone: user.telefone,
        email: user.email,
        onClick: () => {
          toast.promise(
            new Promise((resolve) => {
              setTimeout(() => {
                setUserToken(user.token);
                navigate(`/user/${user.token}`);
                resolve();
              }, 1000);
            }),
            {
              loading: "Buscando informações.",
              success: "Informações encontradas.",
              error: "Erro ao buscar informações.",
            },
            {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                border: "solid 1px #9A3379",
              },
            }
          );
        },
      });
    });
  } catch (error) {
    console.error("Erro ao processar usuários:", error);
    return [];
  }
};

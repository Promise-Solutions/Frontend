import axios from "axios";
import React from "react";
import CardUser from "../../components/cardUser/CardUser.jsx";
import { startFetching, stopFetching } from "../../hooks/isFetching.js";

export const registerRedirect = () => {
  window.location.href = "/register";
};

/**
 * @descrição Comentado pois foi transformado em uma função dentro do contexto
 */

// export const findUsers = async (filterType) => {
//   if (!startFetching()) return []; // Retorna vazio se já estiver buscando

//   return axios
//     .get("http://localhost:5000/usuarios") // Busca usuários
//     .then((response) => {
//       const users = response.data;
//       return filterType
//         ? users.filter((user) => user.tipo === filterType.toLowerCase()) // Certifique-se de que o filtro está em minúsculas
//         : users;
//     })
//     .catch((error) => {
//       console.error("Error ao buscar usuários:", error);
//       return []; // Retorna um array vazio em caso de erro
//     })
//     .finally(() => {
//       stopFetching(); // Libera a flag após a requisição
//     });
// };

export const renderUsers = async (
  filterType,
  findUsers,
  setUserToken,
  navigate
) => {
  const users = await findUsers(filterType);

  return users.map((user) => {
    console.log("Renderizando usuários:", {
      token: user.token,
      email: user.email,
    });

    return React.createElement(CardUser, {
      key: user.token,
      id: user.id,
      name: user.nome,
      category: user.categoria,
      telefone: user.telefone,
      email: user.email,
      onClick: () => {
        setUserToken(user.token);
          navigate(`/user/${user.token}`); // redireciona sem recarregar a página
      },
    });
  });
};

import axios from "axios";
import React from "react";
import CardUser from "../../components/cardUser/CardUser.jsx";

export const registerRedirect = () => {
  window.location.href = "/register";
};

export const findUsers = async (filterType) => {
  return axios
    .get("http://localhost:5000/usuarios") // Busca usuários
    .then((response) => {
      const users = response.data;
      return filterType
        ? users.filter((user) => user.tipo === filterType.toLowerCase()) // Certifique-se de que o filtro está em minúsculas
        : users;
    })
    .catch((error) => {
      console.error("Error ao buscar usuários:", error);
      return []; // Retorna um array vazio em caso de erro
    });
};

export const renderUsers = async (filterType) => {
  const users = await findUsers(filterType);
  return users.map((user) =>
    React.createElement(CardUser, {
      key: user.id, // Add unique key
      id: user.id,
      name: user.nome,
      category: user.categoria,
      telefone: user.telefone,
      email: user.email,
    })
  );
};

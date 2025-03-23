import axios from "axios";
import CardUser from "../../components/cardUser/CardUser.jsx";
import React, { useState, useEffect } from "react";
import { getParams } from "../../hooks/getParams";
import { startFetching, stopFetching } from "../../hooks/isFetching";

export const teste = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!startFetching()) return; // Retorna vazio se já estiver buscando
    const params = getParams();
    const token = params.user;
    axios
      .get(`http://localhost:5000/usuarios?token=${token}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        stopFetching();
      });
  }, []); // Empty dependency array ensures this runs only once

  return user
    ? React.createElement(CardUser, {
        key: user.token,
        id: user.id,
        name: user.nome,
        category: user.categoria,
        telefone: user.telefone,
        email: user.email,
      })
    : React.createElement("div", null, "Carregando...");
};

import axios from "axios";
import CardUser from "../../components/cardUser/CardUser.jsx";
import React, { useEffect } from "react";
import { startFetching, stopFetching } from "../../hooks/isFetching.js";
import { useUserContext } from "../../context/UserContext.jsx";

export const Teste = () => {
  const { user, setUser, userToken } = useUserContext(); // Agora também usando userToken

  useEffect(() => {
    if (!startFetching()) return;
    if (!userToken) return; // Se não tiver token no contexto, não faz a requisição

    axios
      .get(`http://localhost:5000/usuarios?token=${userToken}`)
      .then((response) => {
        setUser(response.data[0]); // Salva no contexto
      })
      .catch((error) => {
        console.log("Erro ao buscar usuário:", error);
      })
      .finally(() => {
        stopFetching();
      });
  }, [userToken]); // Dispara quando o token for setado

  return user ? (
    <CardUser
      key={user.token}
      id={user.id}
      name={user.nome}
      category={user.categoria}
      telefone={user.telefone}
      email={user.email}
    />
  ) : (
    <div>Carregando...</div>
  );
};

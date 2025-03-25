import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { startFetching, stopFetching } from "../hooks/isFetching";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Função declarada
  async function findUsers(filterType) {
    if (!startFetching()) return [];

    try {
      const response = await axios.get("http://localhost:5000/usuarios");
      const users = response.data;

      return filterType
        ? users.filter(
            (user) => user.tipo?.toLowerCase() === filterType.toLowerCase()
          )
        : users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    } finally {
      stopFetching();
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userToken,
        setUserToken,
        findUsers, // Exporta a função
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

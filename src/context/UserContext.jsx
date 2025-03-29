import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // Função declarada
  async function findUsers(filterType) {
    try {
      const endpoint =
        filterType === "1"
          ? "http://localhost:5000/clientes"
          : "http://localhost:5000/funcionarios";
      const response = await axios.get(endpoint);
      const users = response.data;

      return filterType === "1"
        ? users.map((user) => ({
            ...user,
            categoria: user.categoria, // Keep category for "Cliente"
          }))
        : users; // No category for "Funcionário"
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
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

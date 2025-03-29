import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  async function findUsers(filterType) {
    try {
      const endpoint =
        filterType === "CLIENTE"
          ? "http://localhost:5000/clientes"
          : "http://localhost:5000/funcionarios";
      const response = await axios.get(endpoint);
      const users = response.data;

      return users.map((user) => ({
        ...user,
        ativo: user.ativo !== false, // Default to true for both clients and employees
        tipoCliente: filterType === "CLIENTE" ? user.tipoCliente : null, // Fetch tipoCliente only for clients
      }));
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
        findUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

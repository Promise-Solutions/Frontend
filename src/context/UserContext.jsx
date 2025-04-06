import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(() => sessionStorage.getItem("userId"));
  const [isClient, setIsClient] = useState(
    () => sessionStorage.getItem("isClient") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("userId", userId || "");
    sessionStorage.setItem("isClient", isClient);
  }, [userId, isClient]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const endpoint = isClient
          ? `http://localhost:5000/clientes?id=${userId}`
          : `http://localhost:5000/funcionarios?id=${userId}`;
        const response = await axios.get(endpoint);
        const userData = {
          ...response.data[0],
          contato: response.data[0]?.contato || "",
        };

        if (userData) {
          setUser(userData);
        } else {
          throw new Error("Usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [userId, isClient]);

  async function findUsers(filterType) {
    try {
      const endpoint =
        filterType === "CLIENTE"
          ? "http://localhost:5000/clientes"
          : "http://localhost:5000/funcionarios";
      const response = await axios.get(endpoint);
      return response.data;
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
        userId,
        setUserId,
        isClient,
        setIsClient,
        findUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosProvider } from "../provider/apiProvider";

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
          ? `/clientes?id=${userId}`
          : `/funcionarios?id=${userId}`;
        const response = await axiosProvider.get(endpoint);
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
          ? "/clientes"
          : "/funcionarios";
      const response = await axiosProvider.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }


  async function findClients() {
    try {
      const endpoint = "/clientes"
      const response = await axiosProvider.get(endpoint);
      if(response.status === 200) {
        return response.data;
      } 
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }

  const findClientById = async (ClientId) => {
    if(!ClientId) return;

    try {
        const response = await axiosProvider.get(`/clientes?id=${ClientId}`)
        
        if(response.status == 200) {
          const clientData = response.data  
          console.log("cliente", clientData)
          return clientData[0];
        }
    } catch(error) {
        console.error("Erro ao buscar client:", error)
    };
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
        findClients,
        findClientById
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

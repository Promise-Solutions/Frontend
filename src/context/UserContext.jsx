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
      if (!userId) {
        console.log("Nenhum userId encontrado no contexto.");
        return;
      }

      console.log(
        "Buscando dados do usuário com userId:",
        userId,
        "isClient:",
        isClient
      );

      try {
        const endpoint = isClient
          ? `/clients/${userId}`
          : `/employees/${userId}`;
        const response = await axiosProvider.get(endpoint);

        console.log("Resposta da API:", response);

        if (response.data) {
          const userData = Array.isArray(response.data)
            ? response.data[0] // Caso a API retorne um array
            : response.data; // Caso a API retorne um objeto diretamente

          const formattedUserData = {
            ...userData,
            clientType: userData?.clientType || null,
            contact: userData?.contact || userData?.contato || "",
          };

          console.log("Dados formatados do usuário:", formattedUserData);
          setUser(formattedUserData); // Atualiza o estado do usuário
        } else {
          console.error("Nenhum dado encontrado para o usuário.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [userId, isClient]);

  async function findUsers(filterType) {
    try {
      const endpoint = filterType === "CLIENTE" ? "/clients" : "/employees";
      const response = await axiosProvider.get(endpoint);
      return response.data.map((user) => ({
        ...user,
        clientType: user.clientType === "SINGLE" ? "AVULSO" : "MENSAL", // Map values for display
      }));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }

  const findClients = async () => {
    try {
      const response = await axiosProvider.get("/clients");
      return response.data.map((client) => ({
        ...client,
        clientType: client.clientType === "SINGLE" ? "Avulso" : "Mensal",
        active: client.active ? "Ativo" : "Inativo",
      }));
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return [];
    }
  };

  const findEmployees = async () => {
    try {
      const response = await axiosProvider.get("/employees");
      return response.data.map((employee) => ({
        ...employee,
        active: employee.active ? "Ativo" : "Inativo",
      }));
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      return [];
    }
  };

  const findClientById = async (ClientId) => {
    if (!ClientId) return;

    try {
      const response = await axiosProvider.get(`/clients/${ClientId}`);

      if (response.status == 200) {
        const clientData = response.data;
        console.log("cliente", clientData);
        return {
          ...clientData[0],
          clientType:
            clientData[0]?.clientType === "SINGLE" ? "AVULSO" : "MENSAL", // Map values for display
        };
      }
    } catch (error) {
      console.error("Erro ao buscar client:", error);
    }
  };

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
        findEmployees,
        findClientById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

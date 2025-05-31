import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosProvider } from "../provider/apiProvider";
import { ENDPOINTS } from "../constants/endpoints";

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

      try { 
        const endpoint = isClient 
          ? ENDPOINTS.getClientById(userId)
          : ENDPOINTS.getEmployeeById(userId);
        const response = await axiosProvider.get(endpoint);

        if (response.data) {
          const userData = Array.isArray(response.data)
            ? response.data[0] // Caso a API retorne um array
            : response.data; // Caso a API retorne um objeto diretamente

          const formattedUserData = {
            ...userData,
            clientType: userData?.clientType || null,
            contact: userData?.contact || userData?.contato || "",
          };

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
      const endpoint = filterType === "CLIENTES" ? ENDPOINTS.CLIENTS : ENDPOINTS.EMPLOYEES;
      const response = await axiosProvider.get(endpoint);

      // Verifique se response.data é um array antes de usar .map()
      if (Array.isArray(response.data)) {
        console.log("Resposta da API:", response.data);
        return response.data.map((user) => ({
          ...user,
          clientType: user.clientType === "SINGLE" ? "AVULSO" : "MENSAL", // Map values for display
        }));
      } else if (response.data && typeof response.data === "object") {
        console.log(
          "Resposta da API não é um array, mas um objeto:",
          response.data
        );
        // Aqui você pode retornar um array com os dados do objeto
        return [response.data];
      } else {
        console.log(
          "Resposta da API não é um array nem um objeto:",
          response.data
        );
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }

  const findClients = async () => {
    try {
      const response = await axiosProvider.get(ENDPOINTS.CLIENTS);
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
      const response = await axiosProvider.get(ENDPOINTS.EMPLOYEES);
      return response.data.map((employee) => ({
        ...employee,
        active: employee.active ? "Ativo" : "Inativo",
      }));
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      return [];
    }
  };

  const findClientById = async (clientId) => {
    if (!clientId) return;

    try {
      const response = await axiosProvider.get(ENDPOINTS.getClientById(clientId));

      if (response.status == 200) {
        return response.data;
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

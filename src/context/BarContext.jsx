import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BarContext = createContext({});

export function BarProvider({ children }) {
  const [command, setCommand] = useState(null);
  const [commandId, setCommandId] = useState(() => sessionStorage.getItem("id"));

  useEffect(() => {
    sessionStorage.setItem("commandId", commandId || "");
  }, [commandId]);

  useEffect(() => {
    const fetchCommandData = async () => {
      if (!commandId || commandId.trim() === "") {
        setCommand(null); // Garante que o estado seja limpo se o ID for inválido
        return;
      }

      try {
        const endpoint = `http://localhost:5000/commands?id=${commandId}`;
        const response = await axios.get(endpoint);
        const commandData = response.data[0] || null;

        if (commandData) {
          setCommand(commandData);
        } else {
          console.warn("Comanda não encontrada para o id:", commandId);
          setCommand(null); // Garante que o estado seja limpo se a comanda não for encontrada
        }
      } catch (error) {
        console.error("Erro ao buscar dados da comanda:", error);
        setCommand(null); // Garante que o estado seja limpo em caso de erro
      }
    };

    fetchCommandData();
  }, [commandId]);

  async function findCommands(filterType) {
    try {
      const endpoint =
        filterType === "ABERTAS"
          ? "http://localhost:5000/commands?status=Aberta"
          : "http://localhost:5000/commands?status=Fechado";
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
      return [];
    }
  }

  return (
    <BarContext.Provider
      value={{
        command,
        setCommandId,
        findCommands,
      }}
    >
      {children}
    </BarContext.Provider>
  );
}

export const useBarContext = () => useContext(BarContext);

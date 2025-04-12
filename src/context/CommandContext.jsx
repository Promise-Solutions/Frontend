// context/CommandContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosProvider } from "../provider/apiProvider";

const CommandContext = createContext();

export const CommandProvider = ({ children }) => {
  const [command, setCommand] = useState(null);
  const [commandId, setCommandId] = useState(() => localStorage.getItem("commandId")
  );

  // Sempre que commandId mudar, salvar na localStorage
  useEffect(() => {
    localStorage.setItem("commandId", commandId || "");
  }, [commandId]);

  // Buscar comanda com base no ID armazenado
  useEffect(() => {
    const fetchCommandData = async () => {
      if (!commandId) return;

      try {
        const endpoint = `/commands?id=${commandId}`;
        const response = await axiosProvider.get(endpoint);
        const commandData = response.data[0] || null;

        if (commandData) {
          setCommand(commandData);
        } else {
          throw new Error("Comanda não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados da comanda:", error);
      }
    };
    fetchCommandData();
  }, [commandId]);

  // Busca comandas filtradas por status
  const findCommands = async (filterType) => {
    try {
      const endpoint =
        filterType === "ABERTAS"
          ? "/commands?status=Aberta"
          : "/commands?status=Fechada";
      const response = await axiosProvider.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
      return [];
    }
  };

  return (
    <CommandContext.Provider
      value={{
        command,
        setCommand,
        commandId,
        setCommandId,
        findCommands,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommandContext = () => useContext(CommandContext);
// context/CommandContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosProvider } from "../provider/apiProvider";
import { ENDPOINTS } from "../constants/endpoints";

const CommandContext = createContext();

export const CommandProvider = ({ children }) => {
  const [command, setCommand] = useState(null);
  const [commandId, setCommandId] = useState(() =>
    sessionStorage.getItem("commandId")
  );

  useEffect(() => {
    const fetchCommandData = async () => {
      if (!commandId) {
        setCommand(null);
        return;
      }

      try {
        const endpoint = ENDPOINTS.getCommandById(commandId);
        const response = await axiosProvider.get(endpoint);
        const commandData = response.data || null;

        if (commandData) {
          setCommand({
            ...commandData,
            status: commandData.status === "OPEN" ? "Aberta" : "Fechada",
            desconto: `${commandData.discount}%`,
            valorTotal: commandData.totalValue,
          });
        } else {
          throw new Error("Comanda não encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados da comanda:", error);
        setCommand(null); // Clear command on error
      }
    };

    fetchCommandData();
  }, [commandId]); // Removed unnecessary dependencies

  const updateCommandId = (newCommandId) => {
    const currentCommandId = sessionStorage.getItem("commandId");
    if (newCommandId !== commandId && newCommandId !== currentCommandId) {
      setCommand(null);
      setCommandId(newCommandId);
      sessionStorage.setItem("commandId", newCommandId || "");
    }
  };

  const findCommands = async (filterType) => {
    try {
      const endpoint = 
        filterType === "ABERTAS"
          ? ENDPOINTS.getCommandByStatus("OPEN")
          : ENDPOINTS.getCommandByStatus("CLOSED")
      const response = await axiosProvider.get(endpoint);

      console.log(response)

      if (Array.isArray(response.data)) {
        return response.data.map((command) => ({
          ...command,
          status: command.status === "OPEN" ? "Aberta" : "Fechada", // Retorna status correto
          discount: `${command.discount}%`,
          totalValue: `R$ ${parseFloat(command.totalValue).toFixed(2)}`,
        }));
      } else {
        console.log("Erro: response.data não é um array.", response.data);
        return [];
      }
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
        setCommandId: updateCommandId, // Use the updated function
        findCommands,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommandContext = () => useContext(CommandContext);

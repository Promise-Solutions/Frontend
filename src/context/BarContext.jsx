import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BarContext = createContext({});

export function BarProvider({ children }) {
  const [command, setCommand] = useState(null);
  const [id, setId] = useState(() => sessionStorage.getItem("id"));

  useEffect(() => {
    sessionStorage.setItem("id", id || "");
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || id.trim() === "") {
        return;
      }

      try {
        const endpoint = `http://localhost:5000/commands?id=${id}`;
        const response = await axios.get(endpoint);
        const commandData = response.data[0] || null;

        if (commandData) {
          setCommand(commandData);
        } else {
          console.warn("Comanda não encontrada para o id:", id);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da comanda:", error);
      }
    };

    fetchUserData();
  }, [id]);

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
        setId,
        findCommands,
      }}
    >
      {children}
    </BarContext.Provider>
  );
}

export const useBarContext = () => useContext(BarContext);

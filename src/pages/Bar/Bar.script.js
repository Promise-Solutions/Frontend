import React from "react";
import CardCommand from "../../components/cards/cardCommand/CardCommand.jsx";
import { axiosProvider } from "../../provider/apiProvider.js";

export const registerRedirect = (navigate) => {
  console.log("Navigating to /register");
  navigate("/register"); // Use navigate passed as an argument
};

export const stockRedirect = (navigate) => {
  console.log("Navigating to /bar/stock");
  navigate("/bar/stock"); // Use navigate passed as an argument
};

export const renderCommands = async (
  filterType,
  findCommands,
  setCommandId,
  navigate
) => {
  try {
    const commands = await findCommands(filterType); // Busca comandas já filtradas
    console.log("Comandas filtradas:", commands);

    const clientsResponse = await axiosProvider.get("/clients");
    const clients = clientsResponse.data;

    const employeesResponse = await axiosProvider.get("/employees");
    const employees = employeesResponse.data;

    const formatDateTime = (dateTime) => {
      if (!dateTime) return null;
      const date = new Date(dateTime);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    return commands.map((command) => {
      const employee = employees.find(
        (employee) => employee.id === command.fkEmployee
      );
      
      const client = clients.length > 0 ? clients.find((client) => client.id === command.fkClient) : null;

      const dateHourOpen = formatDateTime(command.openingDateTime);
      const dateHourClose =
        command.status === "Fechada"
          ? formatDateTime(command.closingDateTime)
          : null;

      return React.createElement(CardCommand, {
        key: command.id,
        id: command.id,
        commandNumber: command.commandNumber,
        name: client ? client.name : "Funcionário",
        totalValue: command.totalValue,
        dateHourOpen,
        dateHourClose,
        discount: `${command.discount}`,
        employeeName: employee ? employee.name : "Funcionário não encontrado",
        onClick: () => {
          console.log(`Navigating to /command/${command.id}`);
          setCommandId(command.id);
          navigate(`/command/${command.id}`);
        },
      });
    });
  } catch (error) {
    console.error("Erro ao renderizar comandas:", error);
    return [];
  }
};

import React from "react";
import CardCommand from "../../components/cards/CardCommand.jsx";
import { axiosProvider } from "../../provider/apiProvider.js";
import { ROUTERS } from "../../constants/routers.js";
import { ENDPOINTS } from "../../constants/endpoints.js";

export const registerRedirect = (navigate) => {
  navigate(ROUTERS.REGISTER); // Use navigate passed as an argument
};

export const stockRedirect = (navigate) => {
  navigate(ROUTERS.BAR_STOCK); // Use navigate passed as an argument
};

export const renderCommands = async (
  filterType,
  findCommands,
  setCommandId,
  navigate
) => {
  try {
    const commands = await findCommands(filterType); // Busca comandas já filtradas

    const clientsResponse = await axiosProvider.get(ENDPOINTS.CLIENTS);
    const clients = clientsResponse.data;

    const employeesResponse = await axiosProvider.get(ENDPOINTS.EMPLOYEES);
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
          setCommandId(command.id);
          navigate(ROUTERS.getCommand(command.id));
        },
      });
    });
  } catch (error) {
    console.error("Erro ao renderizar comandas:", error);
    return [];
  }
};

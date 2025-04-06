import React from "react";
import axios from "axios";
import CardCommand from "../../components/cardCommand/CardCommand.jsx";

export const registerRedirect = (navigate) => {
  navigate("/register"); // Use navigate passed as an argument
};

export const stockRedirect = (navigate) => {
  navigate("/bar/stock"); // Use navigate passed as an argument
};

export const renderCommands = async (
  filterType,
  findCommands,
  setCommandId,
  navigate
) => {
  try {
    const commands = await findCommands(filterType);

    const commandProductsResponse = await axios.get(
      "http://localhost:5000/commandProduct"
    );
    const commandProducts = commandProductsResponse.data;

    const clientsResponse = await axios.get("http://localhost:5000/clientes");
    const clients = clientsResponse.data;

    const employeesResponse = await axios.get(
      "http://localhost:5000/funcionarios"
    );
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
      const client = clients.find((client) => client.id === command.fkCliente);
      const employee = employees.find(
        (employee) => employee.id === command.fkFuncionario
      );

      const dateHourOpen = formatDateTime(command.dataHoraAbertura);
      const dateHourClose =
        command.status === "Fechada"
          ? formatDateTime(command.dataHoraFechamento)
          : null;

      return React.createElement(CardCommand, {
        key: command.id,
        id: command.id,
        name: client ? client.nome : "Funcionário",
        totalValue: `R$ ${parseFloat(command.valorTotal).toFixed(2)}`, // Reflete o valor total do banco
        dateHourOpen,
        dateHourClose,
        discount: `${command.desconto}%`,
        employeeName: employee ? employee.nome : "Funcionário não encontrado",
        onClick: () => {
          setCommandId(command.id);
          sessionStorage.setItem("commandId", command.id);
          navigate(`/command/${command.id}`);
        },
      });
    });
  } catch (error) {
    console.error("Erro ao renderizar comandas:", error);
    return [];
  }
};

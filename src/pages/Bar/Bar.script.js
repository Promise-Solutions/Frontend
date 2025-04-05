import React from "react";
import CardCommand from "../../components/cardCommand/CardCommand.jsx";
import axios from "axios";

export const registerRedirect = () => {
  window.location.href = "/register";
};
export const stockRedirect = () => {
  window.location.href = "/bar/stock";
};

export const renderCommands = async (
  filterType,
  navigate,
  setCommandId // Adicionado setCommandId para atualizar o contexto
) => {
  try {
    // Buscar todas as comandas da rota commands
    const response = await axios.get("http://localhost:5000/commands");
    const commands = response.data;

    // Buscar todos os produtos relacionados às comandas
    const commandProductsResponse = await axios.get(
      "http://localhost:5000/commandProduct"
    );
    const commandProducts = commandProductsResponse.data;

    // Buscar todos os clientes
    const clientsResponse = await axios.get("http://localhost:5000/clientes");
    const clients = clientsResponse.data;

    // Filtrar comandas com base no status
    const filteredCommands = commands.filter(
      (command) =>
        (filterType === "ABERTAS" && command.status === "Aberta") ||
        (filterType === "FECHADAS" && command.status === "Fechada")
    );

    // Mapear as comandas filtradas para os componentes CardCommand
    return filteredCommands.map((command) => {
      // Encontrar o cliente correspondente
      const client = clients.find((client) => client.id === command.fkCliente);

      // Calcular o valor total da comanda
      const totalValue = commandProducts
        .filter((product) => product.fkComanda === command.id) // Corrigido para usar command.id
        .reduce(
          (sum, product) =>
            sum + parseFloat(product.valorUnitario) * product.qtdProduto,
          0
        )
        .toFixed(2); // Formatar para duas casas decimais

      // Formatar datas e horas no formato DD/MM/YYYY - HH:MM:SS
      const formatDateTime = (dateTime) => {
        if (!dateTime) return null;
        const date = new Date(dateTime);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
      };

      const dateHourOpen = formatDateTime(command.dataHoraAbertura);
      const dateHourClose = formatDateTime(command.dataHoraFechamento);

      return React.createElement(CardCommand, {
        key: command.id, // Corrigido para usar command.id
        id: command.id, // Corrigido para usar command.id
        name: client ? client.nome : "Cliente não encontrado", // Nome do cliente
        totalValue: `R$ ${totalValue}`, // Valor total formatado
        dateHourOpen,
        dateHourClose: command.status === "Fechada" ? dateHourClose : null, // Exibir apenas se fechada
        discount: command.desconto,
        onClick: () => {
          setCommandId(command.id); // Atualiza o ID no contexto
          sessionStorage.setItem("commandId", command.id); // Armazena o ID da comanda na sessão
          navigate(`/bar/command/${command.id}`); // Redireciona para a tela de detalhes da comanda
        },
      });
    });
  } catch (error) {
    console.error("Erro ao buscar comandas:", error);
    return [];
  }
};

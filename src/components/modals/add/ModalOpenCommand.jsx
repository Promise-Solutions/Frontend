import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import CancelButton from "../../buttons/action/CancelButton";
import { showToast } from "../../toastStyle/ToastStyle";
import { axiosProvider } from "../../../provider/apiProvider";
import Input from "../../form/Input";
import { ENDPOINTS } from "../../../constants/endpoints";
import ModalGeneric from "../ModalGeneric";

const ModalOpenCommand = ({ isOpen, onClose, onCommandAdded }) => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openCommands, setOpenCommands] = useState([]);
  const [numberCommand, setNumberCommand] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axiosProvider.get(ENDPOINTS.CLIENTS);
        const employeesResponse = await axiosProvider.get(ENDPOINTS.EMPLOYEES);
        const commandsResponse = await axiosProvider.get(
          ENDPOINTS.getCommandByStatus("OPEN")
        );
        
        setClients(clientsResponse.data || []); // Ensure data is an array
        setEmployees(employeesResponse.data || []); // Ensure data is an array
        setOpenCommands(
          Array.isArray(commandsResponse.data) ? commandsResponse.data : []
        ); // Validate response
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        showToast.error("Erro ao carregar dados.");
      }
    };
    
    fetchData();
  }, []);
  if (!isOpen) return null;

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
  };

  const handleNumberCommandChange = (e) => {
    const numberCommand = e.target.value;
    setNumberCommand(numberCommand);
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  const handleOpenCommand = async () => {
    if (!numberCommand) {
      showToast.error("Por favor, digite um número para comanda.");
      return;
    }

    if (!selectedEmployee) {
      showToast.error("Por favor, selecione um funcionário.");
      return;
    }

    if (
      openCommands.some((command) => command.commandNumber === Number(numberCommand))
    ) {
      showToast.error("Este número de comanda já está em uso.");
      return;
    }

    if (
      selectedClient &&
      openCommands.some(
        (command) => command.fkClient === parseInt(selectedClient)
      )
    ) {
      showToast.error("Este cliente já possui uma comanda aberta.");
      return;
    }

    if (
      (!selectedClient || selectedClient === "null") &&
      openCommands.some(
        (command) =>
          command.fkClient === null && command.fkEmployee === selectedEmployee
      )
    ) {
      showToast.error("Este funcionário já possui uma comanda aberta.");
      return;
    }

    try {
      const now = new Date();
      const offset = -3; // Brasília timezone offset (UTC-3)
      const openingDateTime = new Date(
        now.getTime() + offset * 60 * 60 * 1000
      ).toISOString();

      const newCommand = {
        commandNumber: Number(numberCommand || null),
        fkClient:
          selectedClient == null ||
          selectedClient == "Nenhum (Funcionário)"
            ? null
            : selectedClient,
        fkEmployee: selectedEmployee,
        openingDateTime: openingDateTime,
        status: "OPEN",
        discount: 0.0,
        totalValue: 0.0,
      };

      await axiosProvider.post(ENDPOINTS.COMMANDS, newCommand);
      showToast.success("Comanda aberta com sucesso!");
      onClose();
      onCommandAdded(); // Notify parent to refresh the command list
    } catch (error) {
      console.error("Erro ao abrir comanda:", error);
      showToast.error("Erro ao abrir comanda.");
    }
  };

  const inputs = [
    <Input
      type="number"
      name="commandNumber"
      required
      text="Número da Comanda"
      placeholder="Digite o número da comanda"
      handleOnChange={handleNumberCommandChange}
    />,
    <Select
      text="Cliente"
      name="client"
      options={[
        { id: null, value: null, name: "Nenhum (Funcionário)" }, // Default option with explicit value
        ...clients.map((client) => ({
          id: client.id,
          value: client.id,
          name: client.name,
        })),
      ]}
      handleOnChange={handleClientChange}
      value={selectedClient || "null"}
    />,
    <Select
      text="Funcionário"
      name="employee"
      required
      options={[
        ...employees.map((employee) => ({
          id: employee.id,
          name: employee.name,
        })),
      ]}
      handleOnChange={handleEmployeeChange}
      value={selectedEmployee || ""}
    />
  ]  

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton text="Abrir Comanda" onClick={handleOpenCommand} />
  ]
  
  return (
    <ModalGeneric title="Abrir Nova Comanda" inputs={inputs} buttons={buttons} borderVariant="add" />
  );
};

export default ModalOpenCommand;

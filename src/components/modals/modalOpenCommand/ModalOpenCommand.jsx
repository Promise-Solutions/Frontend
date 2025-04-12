import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import CancelButton from "../modalConfirmDelete/cancelButton";
import axios from "axios";
import { showToast } from "../../toastStyle/ToastStyle";

const ModalOpenCommand = ({ isOpen, onClose }) => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openCommands, setOpenCommands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axios.get(
          "http://localhost:5000/clientes"
        );
        const employeesResponse = await axios.get(
          "http://localhost:5000/funcionarios"
        );
        const commandsResponse = await axios.get(
          "http://localhost:5000/commands?status=Aberta"
        );

        setClients(clientsResponse.data);
        setEmployees(employeesResponse.data);
        setOpenCommands(commandsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        showToast.error("Erro ao carregar dados.");
      }
    };

    fetchData();
  }, []);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  const handleOpenCommand = async () => {
    if (!selectedEmployee) {
      showToast.error("Por favor, selecione um funcionário.");
      return;
    }

    // Check if the client already has an open command
    if (
      selectedClient &&
      openCommands.some(
        (command) => command.fkCliente === parseInt(selectedClient)
      )
    ) {
      showToast.error("Este cliente já possui uma comanda aberta.");
      return;
    }

    // Check if the employee already has an open command with no client
    if (
      (!selectedClient || selectedClient === "null") &&
      openCommands.some(
        (command) =>
          command.fkCliente === null &&
          command.fkFuncionario === parseInt(selectedEmployee)
      )
    ) {
      showToast.error("Este funcionário já possui uma comanda aberta.");
      return;
    }

    try {
      const newCommand = {
        fkCliente: selectedClient ? parseInt(selectedClient) : null, // Set to null if no client is selected
        fkFuncionario: parseInt(selectedEmployee), // Ensure fkFuncionario is an integer
        dataHoraAbertura: new Date().toISOString(),
        status: "Aberta",
        desconto: "0.00",
        valorTotal: "0.00",
      };

      await axios.post("http://localhost:5000/commands", newCommand);
      showToast.success("Comanda aberta com sucesso!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Erro ao abrir comanda:", error);
      showToast.error("Erro ao abrir comanda.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Abrir Nova Comanda<br></br>{" "}
          <span className="text-yellow-zero text-[14px]">
            Não selecione cliente caso a comanda seja de um funcionário
          </span>
        </h2>
        <div className="flex flex-col gap-4">
          <Select
            text="Cliente"
            name="client"
            options={[
              { id: null, value: "null", name: "Nenhum (Funcionário)" }, // Default option with explicit value
              ...clients.map((client) => ({
                id: client.id,
                value: client.id,
                name: client.nome,
              })),
            ]}
            handleOnChange={handleClientChange}
            value={selectedClient || "null"}
          />
          <Select
            text="Funcionário"
            name="employee"
            options={[
              ...employees.map((employee) => ({
                id: employee.id,
                name: employee.nome,
              })),
            ]}
            handleOnChange={handleEmployeeChange}
            value={selectedEmployee || ""}
          />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <CancelButton text="Cancelar" type="button" onClick={onClose} />
          <ConfirmButton text="Abrir Comanda" onClick={handleOpenCommand} />
        </div>
      </div>
    </div>
  );
};

export default ModalOpenCommand;

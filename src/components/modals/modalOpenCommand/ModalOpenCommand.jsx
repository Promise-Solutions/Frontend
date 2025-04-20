import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import CancelButton from "../modalConfirmDelete/cancelButton";
import { showToast } from "../../toastStyle/ToastStyle";
import { axiosProvider } from "../../../provider/apiProvider";

const ModalOpenCommand = ({ isOpen, onClose, onCommandAdded }) => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openCommands, setOpenCommands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axiosProvider.get("/clients");
        const employeesResponse = await axiosProvider.get("/employees");
        const commandsResponse = await axiosProvider.get(
          "/commands?status=OPEN"
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
        fkClient: selectedClient ? selectedClient : null,
        fkEmployee: selectedEmployee,
        openingDateTime: openingDateTime,
        status: "OPEN",
        discount: "0.00",
        totalValue: "0.00",
      };

      await axiosProvider.post("/commands", newCommand);
      showToast.success("Comanda aberta com sucesso!");
      onClose();
      onCommandAdded(); // Notify parent to refresh the command list
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
                name: client.name,
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
                name: employee.name,
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

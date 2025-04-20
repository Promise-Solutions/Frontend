import React, { useState } from "react";
import Select from "../../form/Select";
import Input from "../../form/Input";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import { showToast } from "../../toastStyle/ToastStyle";

const ModalAddTask = ({ isOpen, onClose, onAddTask, employees }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    limitDate: "",
    fkEmployee: "",
    status: "",
  });

  const mapStatusToBackend = {
    Pendente: "PENDING",
    Fazendo: "WORKING",
    Concluído: "COMPLETED",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      showToast.error("Por favor, insira o título da tarefa.");
      return;
    }
    if (!formData.description) {
      showToast.error("Por favor, insira a descrição da tarefa.");
      return;
    }

    const newTask = {
      ...formData,
      title: formData.title,
      description: formData.description,
      startDate: new Date().toISOString(),
      limitDate: formData.limitDate || null,
      fkEmployee: formData.fkEmployee || null,
      status: "PENDING",
    };
    console.log("Payload for new task:", newTask);
    onAddTask(newTask);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      limitDate: "",
      fkEmployee: "",
      status: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            text="Título"
            name="title"
            placeholder="Digite o título"
            handleOnChange={handleInputChange}
            value={formData.title}
          />
          <Input
            type="text"
            text="Descrição"
            name="description"
            placeholder="Digite a descrição"
            handleOnChange={handleInputChange}
            value={formData.description}
          />
          <Input
            type="date"
            text="Data Limite"
            name="limitDate"
            handleOnChange={handleInputChange}
            value={formData.limitDate}
          />
          <Select
            text="Responsável"
            name="fkEmployee"
            options={employees.map((emp) => ({
              id: emp.id,
              name: emp.name,
            }))}
            handleOnChange={handleInputChange}
            value={formData.fkEmployee}
          />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <CancelButton text="Cancelar" onClick={onClose} />
          <ConfirmButton text="Adicionar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ModalAddTask;

import React, { useState } from "react";
import Select from "../../form/Select";
import Input from "../../form/Input";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";

const ModalAddTask = ({ isOpen, onClose, onAddTask, employees }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    responsible: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newTask = {
      ...formData,
      id: Date.now().toString(),
      status: "pendente",
      start_date: new Date().toISOString(),
    };
    onAddTask(newTask);
    setFormData({
      title: "",
      description: "",
      deadline: "",
      responsible: "",
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
            name="deadline"
            handleOnChange={handleInputChange}
            value={formData.deadline}
          />
          <Select
            text="Responsável"
            name="responsible"
            options={employees.map((emp) => ({
              id: emp.id,
              name: emp.name, // Corrigido para usar "name" em vez de "nome"
            }))}
            handleOnChange={handleInputChange}
            value={formData.responsible}
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

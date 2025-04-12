import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import DeleteButton from "../../buttons/deleteButton/DeleteButton";
import Input from "../../form/Input";
import Select from "../../form/Select";

const ModalEditTask = ({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  employees,
}) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    deadline: task.deadline || "",
    responsible: task.responsible || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/tasks/${task.id}`,
        formData
      );
      onEdit(task.id, response.data); // Update the task in the parent component
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Tarefa</h2>
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
              name: emp.nome,
            }))}
            handleOnChange={handleInputChange}
            value={formData.responsible}
          />
        </div>
        <div className="mt-4 flex justify-between gap-4">
          <CancelButton text="Cancelar" onClick={onClose} />
          <DeleteButton text="Deletar" onClick={handleDelete} />
          <ConfirmButton text="Salvar" onClick={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default ModalEditTask;

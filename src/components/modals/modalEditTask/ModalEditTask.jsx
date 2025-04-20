import { useState } from "react";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import DeleteButton from "../../buttons/deleteButton/DeleteButton";
import ModalConfirmDelete from "../modalConfirmDelete/ModalConfirmDelete";
import Input from "../../form/Input";
import Select from "../../form/Select";
import { axiosProvider } from "../../../provider/apiProvider";
import { showToast } from "../../toastStyle/ToastStyle";

const mapStatusToFrontend = {
  PENDING: "Pendente",
  WORKING: "Fazendo",
  COMPLETED: "Concluído",
};

const mapStatusToBackend = {
  Pendente: "PENDING",
  Fazendo: "WORKING",
  Concluído: "COMPLETED",
};

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
    startDate: task.startDate || "",
    limitDate: task.limitDate || "",
    fkEmployee: task.fkEmployee || "",
    status: mapStatusToFrontend[task.status] || task.status,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    if (!formData.title) {
      showToast.error("Por favor, insira o título da tarefa.");
      return;
    }
    if (!formData.description) {
      showToast.error("Por favor, insira a descrição da tarefa.");
      return;
    }
    if (!formData.startDate) {
      showToast.error("Por favor, insira a data de início da tarefa.");
      return;
    }

    try {
      const updatedTask = {
        id: task.id,
        ...formData,
        fkEmployee: formData.fkEmployee || null,
        limitDate: formData.limitDate || null,
        status: mapStatusToBackend[formData.status] || formData.status,
      };
      console.log("Payload for editing task:", updatedTask);
      const response = await axiosProvider.patch(
        `/tasks/${task.id}`,
        updatedTask
      );
      onEdit(task.id, {
        ...response.data,
        status: mapStatusToFrontend[response.data.status],
      });
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
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
              text="Data de Início"
              name="startDate"
              handleOnChange={handleInputChange}
              value={formData.startDate}
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
          <div className="mt-4 flex justify-between gap-4">
            <CancelButton text="Cancelar" onClick={onClose} />
            <DeleteButton text="Deletar" onClick={handleDelete} />
            <ConfirmButton text="Salvar" onClick={handleEdit} />
          </div>
        </div>
      </div>
      <ModalConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Deleção"
        description="Tem certeza de que deseja deletar esta tarefa?"
      />
    </>
  );
};

export default ModalEditTask;

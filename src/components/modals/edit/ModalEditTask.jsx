import { useState } from "react";
import CancelButton from "../../buttons/action/CancelButton";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import DeleteButton from "../../buttons/action/DeleteButton";
import ModalConfirmDelete from "../ModalConfirmDelete";
import Input from "../../form/Input";
import Select from "../../form/Select";
import { axiosProvider } from "../../../provider/apiProvider";
import { showToast } from "../../toastStyle/ToastStyle";
import { ENDPOINTS } from "../../../constants/endpoints";
import ModalGeneric from "../ModalGeneric";

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

const ModalEditTask = ({ task, onClose, onEdit, onDelete, employees }) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    startDate: task.startDate || "",
    limitDate: task.limitDate || "",
    fkEmployee: task.fkEmployee || "",
    fkAssigned: task.fkAssigned || "",
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
        fkAssigned: formData.fkAssigned || null,
        limitDate: formData.limitDate || null,
        status: mapStatusToBackend[formData.status] || formData.status,
      };
      const response = await axiosProvider.patch(
        ENDPOINTS.getTaskById(task.id),
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

  const inputs = [
    <Input
      type="text"
      text="Título"
      name="title"
      required
      placeholder="Digite o título"
      handleOnChange={handleInputChange}
      value={formData.title}
    />,
    <Input
      type="text"
      text="Descrição"
      name="description"
      required
      placeholder="Digite a descrição"
      handleOnChange={handleInputChange}
      value={formData.description}
    />,
    <Input
      type="date"
      text="Data de Início"
      required
      name="startDate"
      handleOnChange={handleInputChange}
      value={formData.startDate}
      className="custom-calendar"
    />,
    <Input
      type="date"
      text="Data Limite"
      name="limitDate"
      handleOnChange={handleInputChange}
      value={formData.limitDate}
      className="custom-calendar"
    />,
    <Select
      text="Responsável"
      name="fkEmployee"
      options={employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
      }))}
      handleOnChange={handleInputChange}
      value={formData.fkEmployee}
    />,
    <Select
      text="Autor"
      name="fkAssigned"
      options={employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
      }))}
      handleOnChange={handleInputChange}
      value={formData.fkAssigned}
    />,
  ];

  const buttons = [
    <div className="flex justify-end gap-4 ">
      <CancelButton text="Cancelar" onClick={onClose} />
      <DeleteButton text="Deletar" onClick={handleDelete} />
      <ConfirmButton text="Salvar" onClick={handleEdit} />
    </div>,
  ];

  return (
    <>
      <ModalGeneric
        title="Editar Tarefa"
        inputs={inputs}
        buttons={buttons}
        borderVariant="edit"
      />
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

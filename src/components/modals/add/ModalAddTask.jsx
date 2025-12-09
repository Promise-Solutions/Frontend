import { useState } from "react";
import Select from "../../form/Select";
import Input from "../../form/Input";
import CancelButton from "../../buttons/action/CancelButton";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import { showToast } from "../../toastStyle/ToastStyle";
import ModalGeneric from "../ModalGeneric";

const ModalAddTask = ({ isOpen, onClose, onAddTask, employees }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    limitDate: "",
    fkEmployee: "",
    fkAssigned: "",
    status: "",
  });
  
  if (!isOpen) return null;
  
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
      fkAssigned: formData.fkAssigned || null,
      status: "PENDING",
    };
    onAddTask(newTask);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      limitDate: "",
      fkEmployee: "",
      fkAssigned: "",
      status: "",
    });
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
    <CancelButton text="Cancelar" onClick={onClose} />,
    <ConfirmButton text="Adicionar" onClick={handleSubmit} />,
  ];

  return (
    <ModalGeneric
      title="Nova Tarefa"
      inputs={inputs}
      buttons={buttons}
      widthModal="w-[400px]"
      borderVariant="add"
    />
  );
};

export default ModalAddTask;

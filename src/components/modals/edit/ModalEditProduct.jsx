import React, { useState, useEffect } from "react";
import Input from "../../form/Input.jsx";
import ConfirmButton from "../../buttons/action/ConfirmButton.jsx";
import CancelButton from "../../buttons/action/CancelButton.jsx";
import { showToast } from "../../toastStyle/ToastStyle.jsx";
import ModalGeneric from "../ModalGeneric.jsx";

const ModalEditProduct = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "qtdProduto" && value < 0 ? 0 : value;
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      showToast.error("Por favor, insira o nome do produto.");
      return;
    }
    if (!formData.clientValue || parseFloat(formData.clientValue) <= 0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }
    if (!formData.internalValue || parseFloat(formData.internalValue) < 0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  const inputs = [
    <Input
      type="text"
      name="name"
      required
      text="Nome do Produto"
      placeholder="Digite o nome do produto"
      value={formData.name || ""}
      handleOnChange={handleInputChange}
      disabled
    />,
    <Input
      type="number"
      name="quantity"
      required
      text="Quantidade"
      placeholder="Digite a quantidade para clientes"
      value={formData.quantity}
      handleOnChange={handleInputChange}
      min="1"
    />,
    <Input
      type="text"
      name="clientValue"
      required
      text="Valor Unitário para Clientes"
      placeholder="Digite o valor para clientes"
      value={formData.clientValue || ""}
      handleOnChange={handleInputChange}
    />,
    <Input
      type="number"
      name="internalValue"
      required
      text="Valor para Funcionários"
      placeholder="Digite o valor para funcionário"
      value={formData.internalValue || ""}
      handleOnChange={handleInputChange}
      min="0"
      step="any"
    />,
  ]

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton onClick={handleSubmit} text="Salvar" />
  ]

  return (
    <ModalGeneric title="Editar Produto" inputs={inputs} buttons={buttons} borderVariant="edit"/>
  );
};

export default ModalEditProduct;

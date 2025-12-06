import React, { useState, useEffect } from "react";
import Input from "../../form/Input.jsx";
import ConfirmButton from "../../buttons/action/ConfirmButton.jsx";
import CancelButton from "../../buttons/action/CancelButton.jsx";
import { showToast } from "../../toastStyle/ToastStyle.jsx";
import ModalGeneric from "../ModalGeneric.jsx";
import { getNumericValue } from "../../../hooks/formatUtils.js";

const ModalEditProduct = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValorChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9.,]/g, "");

    let newValue = value.replace(".", ",")

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }
    
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      showToast.error("Por favor, insira o nome do produto.");
      return;
    }
    if (parseFloat(formData.clientValue) < 0.0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }
    if (parseFloat(formData.internalValue) < 0.0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }

    const formDataToSave = {
      ...formData,
      clientValue: getNumericValue(formData.clientValue),
      internalValue: getNumericValue(formData.internalValue)
    }

    onSave(formDataToSave);
  };

  if (!isOpen) return null;

  const inputs = [
    <Input
      type="text"
      name="name"
      required
      text="Nome do Produto"
      placeholder="Digite o nome do produto"
      value={formData?.name || ""}
      handleOnChange={handleInputChange}
      disabled
    />,
    <Input
      type="text"
      name="clientValue"
      required
      text="Valor Unitário para Clientes"
      placeholder="Digite o valor para clientes"
      value={String(formData?.clientValue).replace(".", ",")  || ""}
      handleOnChange={handleValorChange}
    />,
    <Input
      type="text"
      name="internalValue"
      required
      text="Valor Unitário para Funcionários"
      placeholder="Digite o valor para funcionário"
      value={String(formData?.internalValue).replace(".", ",") || ""}
      handleOnChange={handleValorChange}
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

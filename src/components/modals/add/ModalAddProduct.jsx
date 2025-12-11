import React, { useState } from "react";
import Input from "../../form/Input";
import CancelButton from "../../buttons/action/CancelButton";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import ModalGeneric from "../ModalGeneric";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../constants/routers";

const ModalAddProduct = ({ isOpen, onClose, onAdd }) => {
  const navigate = useNavigate();
  const subTitleForModal = <span>* A quantidade do produto é definida ao adicionar nas <a className="cursor-pointer underline" onClick={() => navigate(ROUTERS.EXPENSES)}>despesas</a></span> ;
  const [formData, setFormData] = useState({
    name: "",
    clientValue: "",
    quantity: 0,
    internalValue: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValorChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9.,]/g, "");

    let newValue = value.replace(".", ",");

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  const inputs = [
    <Input
      type="text"
      name="name"
      required
      text="Nome do Produto"
      placeholder="Digite o nome do produto"
      value={formData.name}
      handleOnChange={handleInputChange}
    />,
    <Input
      type="text"
      name="clientValue"
      required
      text="Valor Unitário para Clientes"
      placeholder="Digite o valor para clientes"
      value={formData.clientValue}
      handleOnChange={handleValorChange}
    />,
    <Input
      type="text"
      name="internalValue"
      required
      text="Valor Unitário para Funcionários"
      placeholder="Digite o valor para funcionários"
      value={formData.internalValue}
      handleOnChange={handleValorChange}
    />,
  ];

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton type="submit" text="Adicionar" onClick={handleSubmit} />,
  ];

  return (
    <ModalGeneric
      title="Adicionar Produto"
      subTitle={subTitleForModal}
      inputs={inputs}
      buttons={buttons}
      borderVariant="add"
    />
  );
};

export default ModalAddProduct;

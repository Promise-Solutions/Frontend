import React, { useState } from "react";
import Input from "../../form/Input";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import CancelButton from "../../buttons/action/CancelButton";
import ModalGeneric from "../ModalGeneric";

const ModalAddDiscount = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const [discount, setDiscount] = useState(0);

  const handleInputChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value))); // Garantir que o valor esteja entre 0 e 100
    setDiscount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(discount); // Passa o valor do desconto para a função de confirmação
    onClose(); // Fecha o modal
  };

  const inputs = [
    <Input
      type="number"
      name="discount"
      text="Desconto (%)"
      placeholder="Digite o desconto"
      value={discount}
      handleOnChange={handleInputChange}
      min="0"
      max="100"
    />
  ]

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton type="submit" text="Confirmar" onClick={handleSubmit} />
  ]

  return (
    <ModalGeneric title="Adicionar Desconto" subTitle={`Deixe em "0" caso não deseje aplicar desconto`} inputs={inputs} buttons={buttons} widthModal="w-[400px]" borderVariant="add"/>
  );
};

export default ModalAddDiscount;

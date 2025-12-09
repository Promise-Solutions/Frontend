import React, { useState } from "react";
import Input from "../../form/Input";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import CancelButton from "../../buttons/action/CancelButton";
import ModalGeneric from "../ModalGeneric";
import { getNumericValue } from "../../../hooks/formatUtils";

const ModalAddDiscount = ({ isOpen, onClose, onConfirm }) => {
  const [discount, setDiscount] = useState(0);
  if (!isOpen) return null;

   const handleInputChange = (e) => {
    let value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    if (value !== "") {
      const numValue = Math.min(100, Math.max(0, Number(value)));
      value = String(numValue);
    }

    setDiscount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericDiscount = getNumericValue(discount);
    onConfirm(numericDiscount); 
    onClose();
  };

  const inputs = [
    <Input
      type="text"
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

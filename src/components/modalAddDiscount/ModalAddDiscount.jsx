import React, { useState } from "react";
import Input from "../form/Input";
import ConfirmButton from "../confirmButton/ConfirmButton";
import CancelButton from "../modalConfirmDelete/cancelButton";

const ModalAddDiscount = ({ isOpen, onClose, onConfirm }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Adicionar Desconto <br></br>{" "}
          <span className="text-yellow-zero text-[14px]">
            Deixe em "0" caso não deseja aplicar desconto
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <CancelButton text="Cancelar" type="button" onClick={onClose} />
            <ConfirmButton type="submit" text="Confirmar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddDiscount;

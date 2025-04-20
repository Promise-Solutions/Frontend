import React, { useState } from "react";
import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";

const ModalAddProduct = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unitValue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "quantity" && value < 0 ? 0 : value;
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", quantity: 0, unitValue: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              text="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={formData.name}
              handleOnChange={handleInputChange}
            />
            <Input
              type="number"
              name="quantity"
              text="Quantidade"
              placeholder="Digite a quantidade"
              value={formData.quantity}
              handleOnChange={handleInputChange}
              min="0"
            />
            <Input
              type="text"
              name="unitValue"
              text="Valor Unitário"
              placeholder="Digite o valor unitário"
              value={formData.unitValue}
              handleOnChange={handleInputChange}
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <CancelButton text="Cancelar" type="button" onClick={onClose} />
            <ConfirmButton type="submit" text="Adicionar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddProduct;

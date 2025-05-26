import React, { useState } from "react";
import Input from "../../form/Input";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";

const ModalAddProduct = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    clientValue: "",
    employeeValue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", clientValue: "", employeeValue: "" });
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
              required
              text="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={formData.name}
              handleOnChange={handleInputChange}
            />
            <Input
              type="number"
              name="clientValue"
              required
              text="Valor Unitário para Clientes"
              placeholder="Digite o valor para clientes"
              value={formData.clientValue}
              handleOnChange={handleInputChange}
              min="0"
              step="any"
            />
            <Input
              type="number"
              name="employeeValue"
              required
              text="Valor Unitário para Funcionários"
              placeholder="Digite o valor para funcionários"
              value={formData.employeeValue}
              handleOnChange={handleInputChange}
              min="0"
              step="any"
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

import React, { useState, useEffect } from "react";
import Input from "../../form/Input.jsx";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton.jsx";
import CancelButton from "../modalConfirmDelete/cancelButton.jsx";
import { showToast } from "../../toastStyle/ToastStyle";

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
    if (!formData.quantity || formData.quantity < 0) {
      showToast.error("Por favor, insira uma quantidade válida.");
      return;
    }
    if (!formData.unitValue || parseFloat(formData.unitValue) <= 0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }
    if (!formData.buyValue || parseFloat(formData.buyValue) < 0) {
      showToast.error("Por favor, insira um valor unitário válido.");
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              text="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={formData.name || ""}
              handleOnChange={handleInputChange}
              disabled
            />
            <Input
              type="number"
              name="quantity"
              text="Quantidade"
              placeholder="Digite a quantidade"
              value={formData.quantity || ""}
              handleOnChange={handleInputChange}
              min="0"
            />
            <Input
              type="text"
              name="unitValue"
              text="Valor Unitário de Venda"
              placeholder="Digite o valor unitário"
              value={formData.unitValue || ""}
              handleOnChange={handleInputChange}
            />
            <Input
              type="number"
              name="buyValue"
              text="Valor Total de Compra"
              placeholder="Digite o valor de compra"
              value={formData.buyValue || ""}
              handleOnChange={handleInputChange}
              min="0"
              step="any"
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <CancelButton text="Cancelar" type="button" onClick={onClose} />
            <ConfirmButton type="submit" text="Salvar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProduct;

import React, { useState, useEffect } from "react";
import Select from "../form/Select";
import Input from "../form/Input";
import ConfirmButton from "../confirmButton/ConfirmButton";
import CancelButton from "../modalConfirmDelete/cancelButton.jsx";

const ModalEditCommandProduct = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  allProducts,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = allProducts.find(
      (product) => product.id === parseInt(selectedProductId)
    );

    if (selectedProduct) {
      setFormData({
        ...formData,
        idProduto: selectedProduct.id,
        nomeProduto: selectedProduct.nomeProduto,
        valorUnitario: selectedProduct.valorUnitario,
        estoque: selectedProduct.qtdProduto,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Editar Produto na Comanda</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Select
              text="Produto"
              name="idProduto"
              options={allProducts.map((product) => ({
                id: product.id,
                name: `${product.nomeProduto} (Estoque: ${product.qtdProduto})`,
              }))}
              handleOnChange={handleProductSelect}
              value={formData.idProduto || ""}
            />
            <Input
              type="number"
              name="qtdProduto"
              text={`Quantidade ${
                formData.estoque ? `(Disponível: ${formData.estoque})` : ""
              }`}
              placeholder="Digite a quantidade"
              handleOnChange={handleInputChange}
              value={formData.qtdProduto || ""}
              min={1}
              max={formData.estoque || ""}
            />
            <Input
              type="text"
              name="valorUnitario"
              text="Valor Unitário"
              placeholder="Digite o valor unitário"
              handleOnChange={handleInputChange}
              value={formData.valorUnitario || ""}
              disabled
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

export default ModalEditCommandProduct;

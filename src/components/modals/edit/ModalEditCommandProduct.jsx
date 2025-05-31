import React, { useState, useEffect } from "react";
import Select from "../../form/Select.jsx";
import Input from "../../form/Input.jsx";
import ConfirmButton from "../../buttons/action/ConfirmButton.jsx";
import CancelButton from "../../buttons/action/CancelButton.jsx";
import { showToast } from "../../toastStyle/ToastStyle.jsx";

const ModalEditCommandProduct = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  allProducts,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData({
        idProduto: initialData.idProduto,
        nomeProduto: initialData.name, // Map initial product name
        qtdProduto: initialData.productQuantity, // Map initial quantity
        valorUnitario: initialData.clientValue, // Map initial unit value
        estoque: initialData.stockQuantity, // Map initial stock quantity
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProductSelect = (e) => {
    const selectedProductId = parseInt(e.target.value); // Ensure the ID is parsed as an integer
    const selectedProduct = allProducts.find(
      (product) => product.id === selectedProductId
    );

    if (selectedProduct) {
      setFormData({
        ...formData,
        idProduto: selectedProduct.id,
        nomeProduto: selectedProduct.name, // Correct field for product name
        valorUnitario: selectedProduct.clientValue, // Correct field for unit value
        estoque: selectedProduct.quantity, // Correct field for stock quantity
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.idProduto) {
      showToast.error("Por favor, selecione um produto.");
      return;
    }
    if (!formData.qtdProduto || formData.qtdProduto <= 0) {
      showToast.error("Por favor, insira uma quantidade válida.");
      return;
    }
    if (formData.qtdProduto > formData.estoque) {
      showToast.error("A quantidade não pode exceder o estoque disponível.");
      return;
    }

    onSave({
      ...formData,
      qtdProduto: parseInt(formData.qtdProduto),
      valorUnitario: parseFloat(formData.valorUnitario),
    });
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
              required
              options={allProducts.map((product) => ({
                id: product.id,
                name: `${product.name} (Estoque: ${product.quantity})`,
              }))}
              handleOnChange={handleProductSelect}
              value={formData.idProduto || ""}
            />
            <Input
              type="number"
              name="qtdProduto"
              required
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
              required
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

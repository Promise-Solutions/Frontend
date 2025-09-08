import { useState, useEffect } from "react";
import Select from "../../form/Select.jsx";
import Input from "../../form/Input.jsx";
import ConfirmButton from "../../buttons/action/ConfirmButton.jsx";
import CancelButton from "../../buttons/action/CancelButton.jsx";
import { showToast } from "../../toastStyle/ToastStyle.jsx";
import ModalGeneric from "../ModalGeneric.jsx";

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
        valorUnitario: initialData.unitValue, // Map initial unit value
        estoque: initialData.stockQuantity, // Map initial stock quantity
        qtdAtual: initialData.productQuantity,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if(name === "qtdProduto") {
        value = value.replace(/[^0-9]/g, "")
    }
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
        valorUnitario: selectedProduct.unitValue, // Correct field for unit value
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
    if (formData.qtdProduto > (formData.estoque + formData.qtdAtual)) {
      showToast.error("A quantidade não pode exceder o estoque disponível.");
      return;
    }

    onSave({
      ...formData,
      qtdProduto: parseInt(formData.qtdProduto),
      valorUnitario: parseFloat(formData.valorUnitario),
    });
  };

  console.log(formData)

  if (!isOpen) return null;

  const inputs = [
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
    />,
    <Input
      type="text"
      name="qtdProduto"
      required
      text={`Quantidade ${
        formData.estoque ? `(Disponível: ${formData.estoque})` : ""
      }`}
      placeholder="Digite a quantidade"
      handleOnChange={handleInputChange}
      value={formData.qtdProduto || ""}
    />
  ]

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton type="submit" text="Salvar" onClick={handleSubmit} />
  ]

  return (
    <ModalGeneric title="Editar Produto na Comanda" inputs={inputs} buttons={buttons} borderVariant="edit"/>
  );
};

export default ModalEditCommandProduct;

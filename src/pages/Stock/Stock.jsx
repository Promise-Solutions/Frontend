import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton.jsx";
import ModalConfirmDelete from "../../components/modals/modalConfirmDelete/ModalConfirmDelete.jsx";
import StockTable from "../../components/tables/stockTable";
import ModalAddProduct from "../../components/modals/modalAddProduct/ModalAddProduct.jsx";
import ModalEditProduct from "../../components/modals/modalEditProduct/ModalEditProduct.jsx";
import { showToast } from "../../components/toastStyle/ToastStyle.jsx";
import { axiosProvider } from "../../provider/apiProvider.js";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 0,
    unitValue: "",
    buyValue: 0.0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosProvider.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const productToAdd = {
        ...newProduct,
        quantity: parseInt(newProduct.quantity),
        unitValue: parseFloat(newProduct.unitValue).toFixed(2),
        buyValue: parseFloat(newProduct.buyValue).toFixed(2),
      };
      const response = await axiosProvider.post(
        "/products",
        productToAdd
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const productToUpdate = {
        ...editingProduct,
        ...updatedProduct,
        quantity: parseInt(updatedProduct.quantity),
        unitValue: parseFloat(updatedProduct.unitValue).toFixed(2),
        buyValue: parseFloat(updatedProduct.buyValue).toFixed(2),
      };
      await axiosProvider.patch(
        `/products/${editingProduct.id}`,
        productToUpdate
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? productToUpdate : product
        )
      );
      setEditingProduct(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosProvider.delete(
        `/products/${productToDelete.id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      showToast.error("Erro ao excluir produto. Verifique se o produto está em uso.");
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="text-white my-6 mx-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-thin">Gerenciar Estoque</h1>
        <PrimaryButton
          text="Adicionar Produto"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <StockTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ModalAddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
      <ModalEditProduct
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProduct}
        initialData={editingProduct}
      />
      <ModalConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={"Deletar Produto"}
        description={"Tem certeza de que deseja deletar este produto?"}
      />
    </div>
  );
};

export default Stock;

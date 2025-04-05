import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import ModalConfirmDelete from "../../components/modalConfirmDelete/ModalConfirmDelete";
import StockTable from "../../components/tables/stockTable";
import ModalAddProduct from "../../components/modalAddProduct/ModalAddProduct";
import ModalEditProduct from "../../components/modalEditProduct/ModalEditProduct";
import { showToast } from "../../components/toastStyle/ToastStyle.jsx";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    nomeProduto: "",
    qtdProduto: 0,
    valorUnitario: "",
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
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const productToAdd = {
        ...newProduct,
        qtdProduto: parseInt(newProduct.qtdProduto),
        valorUnitario: parseFloat(newProduct.valorUnitario).toFixed(2),
      };
      const response = await axios.post(
        "http://localhost:5000/products",
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
        qtdProduto: parseInt(updatedProduct.qtdProduto),
        valorUnitario: parseFloat(updatedProduct.valorUnitario).toFixed(2),
      };
      await axios.patch(
        `http://localhost:5000/products/${editingProduct.id}`,
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
      await axios.delete(
        `http://localhost:5000/products/${productToDelete.id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      showToast.error("Erro ao excluir produto.");
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

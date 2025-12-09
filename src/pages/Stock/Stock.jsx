import { useEffect, useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";
import ModalConfirmDelete from "../../components/modals/ModalConfirmDelete.jsx";
import StockTable from "../../components/tables/stockTable";
import ModalAddProduct from "../../components/modals/add/ModalAddProduct.jsx";
import ModalEditProduct from "../../components/modals/edit/ModalEditProduct.jsx";
import { showToast } from "../../components/toastStyle/ToastStyle";
import { axiosProvider } from "../../provider/apiProvider.js";
import { SyncLoader } from "react-spinners";
import { ENDPOINTS } from "../../constants/endpoints.js";
import { getNumericValue } from "../../hooks/formatUtils.js";
import ExpenseFilter from "../../components/filters/ExpenseFilter.jsx";
import RegisterButton from "../../components/buttons/action/RegisterButton.jsx";
import StockFilter from "../../components/filters/StockFilter.jsx";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosProvider.get(ENDPOINTS.PRODUCTS);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const productToAdd = {
        ...newProduct,
        quantity: parseInt(newProduct.quantity),
        clientValue: getNumericValue(newProduct.clientValue),
        internalValue: getNumericValue(newProduct.internalValue),
      };
      const response = await axiosProvider.post(
        ENDPOINTS.PRODUCTS,
        productToAdd
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);
      showToast.success("Produto adicionado com sucesso!");
      setIsAddModalOpen(false);
    } catch (error) {
      showToast.error("Erro ao adicionar produto!");
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
        clientValue: getNumericValue(updatedProduct.clientValue),
        internalValue: getNumericValue(updatedProduct.internalValue),
      };
      await axiosProvider.patch(
        ENDPOINTS.getProductById(editingProduct.id),
        productToUpdate
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? productToUpdate : product
        )
      );
      setEditingProduct(null);
      showToast.success("Produto atualizado com sucesso!");
      setIsEditModalOpen(false);
    } catch (error) {
      showToast.error("Erro ao atualizar produto!");
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosProvider.delete(ENDPOINTS.getProductById(productToDelete.id));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      showToast.error(
        "Erro ao excluir produto. Verifique se o produto está em uso."
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const filteredExpenseElements = products.filter((element) => {
    const visibleFields = [
      element.id,
      element.name,
      element.quantity,
      element.clientValue,
      element.internalValue,
    ].map((field) =>
      String(field ?? "")
        .toUpperCase()
        .trim()
    );

    const term = searchTerm.toUpperCase().trim();

    return visibleFields.some((field) => field.includes(term));
  });

  return (
    <div className="slide-in-ltr text-white my-6 mx-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-thin pt-3">Gerencie seu estoque</h1>
      </div>
      <div className="flex gap-2 justify-end text-gray-400 border-t-1 border-gray-600 pt-4 mt-7">
        <StockFilter
          id="input_search_expense"
          placeholder="Busque um Produto"
          onSearch={handleSearch}
        />
        <RegisterButton
          id="register_button"
          title="Cadastrar Usuário"
          text="+"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center mt-[5rem]">
          <SyncLoader
            size={8}
            loading={true}
            color={"#02AEBA"}
            speedMultiplier={2}
          />
        </div>
      ) : (
        <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
          <StockTable
            products={filteredExpenseElements}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

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

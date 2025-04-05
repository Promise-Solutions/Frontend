import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import DeleteButton from "../../components/deleteButton/DeleteButton";
import ModalConfirmDelete from "../../components/modalConfirmDelete/ModalConfirmDelete";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "qtdProduto" && value < 0 ? 0 : value; // Impede valores negativos
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure the default form submission is prevented
    try {
      const newProduct = {
        ...formData,
        qtdProduto: parseInt(formData.qtdProduto),
        valorUnitario: parseFloat(formData.valorUnitario).toFixed(2),
      };
      const response = await axios.post(
        "http://localhost:5000/products",
        newProduct
      );
      setProducts((prevProducts) => [...prevProducts, response.data]); // Adiciona o novo produto ao estado local
      setFormData({ nomeProduto: "", qtdProduto: 0, valorUnitario: "" });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nomeProduto: product.nomeProduto,
      qtdProduto: product.qtdProduto,
      valorUnitario: product.valorUnitario,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Ensure the default form submission is prevented
    try {
      const updatedProduct = {
        ...editingProduct,
        ...formData,
        qtdProduto: parseInt(formData.qtdProduto),
        valorUnitario: parseFloat(formData.valorUnitario).toFixed(2),
      };
      await axios.patch(
        `http://localhost:5000/products/${editingProduct.id}`, // Certifique-se de que o ID está correto
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? updatedProduct
            : product
        )
      ); // Atualiza o estado local
      setEditingProduct(null);
      setFormData({ nomeProduto: "", qtdProduto: 0, valorUnitario: "" });
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
        `http://localhost:5000/products/${productToDelete.id}` // Certifique-se de que o ID está correto
      );
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id !== productToDelete.id
        )
      ); // Remove o produto do estado local
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <div className="text-white my-6 mx-16">
      {" "}
      {/* Adiciona margem horizontal de 64px */}
      <div className="flex justify-between items-center mb-4">
        {" "}
        {/* Alinha título e botão lado a lado */}
        <h1 className="text-2xl font-thin">Gerenciar Estoque</h1>{" "}
        {/* Fonte ajustada para thin */}
        <PrimaryButton
          text="Adicionar Produto"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      {/* Modal de Adicionar Produto */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
          <div className="bg-[#1E1E1E] border-1 border-gray-700 text-white p-6 shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="nomeProduto"
                  text="Nome do Produto"
                  placeholder="Digite o nome do produto"
                  value={formData.nomeProduto}
                  handleOnChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="qtdProduto"
                  text="Quantidade"
                  placeholder="Digite a quantidade"
                  value={formData.qtdProduto}
                  handleOnChange={handleInputChange}
                  min="0" // Permite quantidade mínima de 0
                />
                <Input
                  type="text"
                  name="valorUnitario"
                  text="Valor Unitário"
                  placeholder="Digite o valor unitário"
                  value={formData.valorUnitario}
                  handleOnChange={handleInputChange}
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <PrimaryButton
                  text="Cancelar"
                  type="button" // Ensure this button does not trigger form submission
                  onClick={() => setIsAddModalOpen(false)}
                />
                <SubmitButton text="Adicionar" />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal de Editar Produto */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
          <div className="bg-[#1E1E1E] border-1 border-gray-700 text-white p-6 shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="nomeProduto"
                  text="Nome do Produto"
                  placeholder="Digite o nome do produto"
                  value={formData.nomeProduto}
                  handleOnChange={handleInputChange}
                  disabled // Nome do produto não pode ser alterado
                />
                <Input
                  type="number"
                  name="qtdProduto"
                  text="Quantidade"
                  placeholder="Digite a quantidade"
                  value={formData.qtdProduto}
                  handleOnChange={handleInputChange}
                  min="0"
                />
                <Input
                  type="text"
                  name="valorUnitario"
                  text="Valor Unitário"
                  placeholder="Digite o valor unitário"
                  value={formData.valorUnitario}
                  handleOnChange={handleInputChange}
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <PrimaryButton
                  text="Cancelar"
                  type="button" // Ensure this button does not trigger form submission
                  onClick={() => setIsEditModalOpen(false)}
                />
                <SubmitButton text="Salvar" />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Tabela de Produtos */}
      <div
        className="overflow-y-auto max-h-[400px]"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} // Fundo com black e 20% de opacidade
      >
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-700 px-4 py-2">Id</th>
              <th className="border border-gray-700 px-4 py-2">Nome</th>
              <th className="border border-gray-700 px-4 py-2">Quantidade</th>
              <th className="border border-gray-700 px-4 py-2">
                Valor Unitário
              </th>
              <th className="border border-gray-700 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-700 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {product.nomeProduto}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {product.qtdProduto}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  R$ {product.valorUnitario}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  <div className="flex gap-2">
                    <PrimaryButton
                      text="Editar"
                      onClick={() => handleEdit(product)}
                    />
                    <DeleteButton
                      text="Excluir"
                      onClick={() => handleDelete(product)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de Confirmação de Exclusão */}
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

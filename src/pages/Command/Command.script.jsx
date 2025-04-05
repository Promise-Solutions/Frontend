import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select"; // Import Select component
import ConfirmButton from "../../components/confirmButton/ConfirmButton"; // Import ConfirmButton component
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import DeleteButton from "../../components/deleteButton/DeleteButton";
import Table from "../../components/tables/Table";
import ModalConfirmDelete from "../../components/modalConfirmDelete/ModalConfirmDelete";
import ModalEditCommandProduct from "../../components/modalEditCommandProduct/ModalEditCommandProduct";
import ModalAddDiscount from "../../components/modalAddDiscount/ModalAddDiscount"; // Importa o novo modal
import { useCommandContext } from "../../context/CommandContext"; // Importa o BarContext
import { showToast } from "../../components/toastStyle/ToastStyle.jsx";
import { calcTotalWithDiscount } from "../../hooks/Calc"; // Importa a função de cálculo

export const RenderCommandDetails = () => {
  const { command, setCommand, commandId, setCommandId } = useCommandContext(); // Usa o BarContext para obter a comanda
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nomeProduto: "",
    qtdProduto: 0,
    valorUnitario: "",
    estoque: 0,
    idProduto: null,
  });
  const [allProducts, setAllProducts] = useState([]); // State to store all available products
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditCommandProductModalOpen, setIsEditCommandProductModalOpen] =
    useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingCommandProduct, setEditingCommandProduct] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState(""); // Nome do funcionário
  const [clientName, setClientName] = useState(""); // Nome do cliente

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Ainda aberta";
    const date = new Date(dateTime);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    if (!command) {
      setProducts([]);
      return;
    }

    const fetchCommandDetails = async () => {
      try {
        // Buscar o funcionário pelo fkFuncionario
        const employeeResponse = await axios.get(
          `http://localhost:5000/funcionarios`
        );
        const employee = employeeResponse.data.find(
          (emp) => emp.id === command.fkFuncionario
        );
        setEmployeeName(
          employee ? employee.nome : "Funcionário não encontrado"
        );

        // Buscar o cliente pelo fkCliente
        if (command.fkCliente) {
          const clientResponse = await axios.get(
            `http://localhost:5000/clientes`
          );
          const client = clientResponse.data.find(
            (cli) => cli.id === command.fkCliente
          );
          setClientName(client ? client.nome : "Cliente não encontrado");
        } else {
          setClientName("Cliente não associado");
        }

        // Buscar produtos relacionados à comanda
        const productsResponse = await axios.get(
          `http://localhost:5000/commandProduct?fkComanda=${command.id}`
        );
        const allProductsResponse = await axios.get(
          "http://localhost:5000/products"
        );

        const enrichedProducts = productsResponse.data.map((product) => {
          const relatedProduct = allProductsResponse.data.find(
            (p) => p.id === product.fkProduto
          );
          return {
            ...product,
            nomeProduto: relatedProduct
              ? relatedProduct.nomeProduto
              : "Desconhecido",
            idProduto: relatedProduct ? relatedProduct.id : "N/A",
          };
        });

        setProducts(enrichedProducts);
      } catch (error) {
        console.error("Erro ao buscar detalhes da comanda:", error);
        setProducts([]);
      }
    };

    fetchCommandDetails();
  }, [command]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "qtdProduto") {
      const quantity = parseInt(value);
      if (quantity > newProduct.estoque) {
        showToast.error("A quantidade não pode exceder o estoque disponível.");
        return;
      }
    }

    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = allProducts.find(
      (product) => product.id === parseInt(selectedProductId)
    );

    if (selectedProduct) {
      setNewProduct({
        nomeProduto: selectedProduct.nomeProduto,
        qtdProduto: 0,
        valorUnitario: selectedProduct.valorUnitario,
        estoque: selectedProduct.qtdProduto, // Correctly map qtdProduto to estoque
        idProduto: selectedProduct.id,
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.idProduto || newProduct.qtdProduto <= 0) {
      showToast.error(
        "Por favor, selecione um produto e insira uma quantidade válida."
      );
      return;
    }

    if (newProduct.qtdProduto > newProduct.estoque) {
      showToast.error("A quantidade não pode exceder o estoque disponível.");
      return;
    }

    try {
      const productToAdd = {
        fkComanda: command.id,
        fkProduto: newProduct.idProduto,
        qtdProduto: parseInt(newProduct.qtdProduto),
        valorUnitario: parseFloat(newProduct.valorUnitario).toFixed(2),
      };

      // Add the product to the command
      const response = await axios.post(
        "http://localhost:5000/commandProduct",
        productToAdd
      );

      // Update the stock of the product in the database
      const updatedStock = newProduct.estoque - newProduct.qtdProduto;
      await axios.patch(
        `http://localhost:5000/products/${newProduct.idProduto}`,
        {
          qtdProduto: updatedStock,
        }
      );

      // Update the local state
      setProducts((prev) => [...prev, response.data]);
      setAllProducts((prev) =>
        prev.map((product) =>
          product.id === newProduct.idProduto
            ? { ...product, qtdProduto: updatedStock }
            : product
        )
      );

      setNewProduct({
        nomeProduto: "",
        qtdProduto: 0,
        valorUnitario: "",
        estoque: 0,
        idProduto: null,
      });

      showToast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      showToast.error("Erro ao adicionar produto.");
    }
  };

  const handleEditCommandProduct = (product) => {
    setEditingCommandProduct(product);
    setIsEditCommandProductModalOpen(true);
  };

  const handleRemoveProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Add the product back to the stock
      const updatedStock =
        allProducts.find((product) => product.id === productToDelete.fkProduto)
          .qtdProduto + productToDelete.qtdProduto;

      await axios.patch(
        `http://localhost:5000/products/${productToDelete.fkProduto}`,
        { qtdProduto: updatedStock }
      );

      // Remove the product from the command
      await axios.delete(
        `http://localhost:5000/commandProduct/${productToDelete.id}`
      );

      // Update local state
      setProducts((prev) =>
        prev.filter((product) => product.id !== productToDelete.id)
      );
      setAllProducts((prev) =>
        prev.map((product) =>
          product.id === productToDelete.fkProduto
            ? { ...product, qtdProduto: updatedStock }
            : product
        )
      );

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      showToast.error("Erro ao remover produto.");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const originalProduct = products.find(
        (product) => product.id === editingCommandProduct.id
      );

      if (!originalProduct) {
        showToast.error("Produto original não encontrado.");
        return;
      }

      const selectedProduct = allProducts.find(
        (product) => product.id === updatedProduct.idProduto
      );

      if (!selectedProduct) {
        showToast.error("Produto selecionado não encontrado.");
        return;
      }

      const quantityDifference =
        parseInt(updatedProduct.qtdProduto) - originalProduct.qtdProduto;

      if (
        quantityDifference > 0 &&
        quantityDifference > selectedProduct.qtdProduto
      ) {
        showToast.error("A quantidade excede o estoque disponível.");
        return;
      }

      // Update the stock in the database
      const updatedStock = selectedProduct.qtdProduto - quantityDifference;

      await axios.patch(
        `http://localhost:5000/products/${updatedProduct.idProduto}`,
        { qtdProduto: updatedStock }
      );

      // Update the product in the command
      const productToUpdate = {
        ...editingCommandProduct,
        ...updatedProduct,
        qtdProduto: parseInt(updatedProduct.qtdProduto),
        valorUnitario: parseFloat(updatedProduct.valorUnitario).toFixed(2),
      };

      await axios.patch(
        `http://localhost:5000/commandProduct/${editingCommandProduct.id}`,
        productToUpdate
      );

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingCommandProduct.id ? productToUpdate : product
        )
      );

      setAllProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.idProduto
            ? { ...product, qtdProduto: updatedStock }
            : product
        )
      );

      setEditingCommandProduct(null);
      setIsEditCommandProductModalOpen(false);
      showToast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      showToast.error("Erro ao atualizar produto.");
    }
  };

  const calculateTotalValue = () => {
    return parseFloat(command.valorTotal).toFixed(2); // Reflete o valor total do banco
  };

  const handleToggleCommandStatus = async () => {
    if (command.status === "Aberta") {
      setIsDiscountModalOpen(true); // Abre o modal para adicionar desconto
    } else {
      // Lógica para reabrir a comanda
      const totalValue = products.reduce(
        (sum, product) =>
          sum + parseFloat(product.valorUnitario) * product.qtdProduto,
        0
      );

      await axios.patch(`http://localhost:5000/commands/${command.id}`, {
        status: "Aberta",
        dataHoraFechamento: null,
        desconto: "0.00", // Zera o desconto
        valorTotal: totalValue.toFixed(2), // Atualiza o valor total sem desconto
      });

      setCommand({
        ...command,
        status: "Aberta",
        dataHoraFechamento: null,
        desconto: "0.00",
        valorTotal: totalValue.toFixed(2),
      });

      showToast.success("Comanda reaberta com sucesso!");
    }
  };

  const handleAddDiscount = async (discount) => {
    const totalValue = products.reduce(
      (sum, product) =>
        sum + parseFloat(product.valorUnitario) * product.qtdProduto,
      0
    );
    const discountedValue = calcTotalWithDiscount(totalValue, discount); // Usa a lógica atualizada

    await axios.patch(`http://localhost:5000/commands/${command.id}`, {
      status: "Fechada",
      dataHoraFechamento: new Date().toISOString(),
      desconto: discount.toFixed(2),
      valorTotal: discountedValue.toFixed(2),
    });

    setCommand({
      ...command,
      status: "Fechada",
      dataHoraFechamento: new Date().toISOString(),
      desconto: discount.toFixed(2),
      valorTotal: discountedValue.toFixed(2),
    });

    showToast.success("Desconto aplicado com sucesso!");
  };

  const handleDeleteCommand = async () => {
    try {
      // Delete the command from the database
      await axios.delete(`http://localhost:5000/commands/${command.id}`);

      // Clear the command context and redirect
      setCommand(null);
      setCommandId(null);
      sessionStorage.removeItem("commandId");
      window.location.href = "/bar";

      showToast.success("Comanda deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar comanda:", error);
      showToast.error("Erro ao deletar comanda.");
    }
  };

  if (!command) {
    return <p>Carregando detalhes da comanda...</p>;
  }

  return (
    <div className="flex flex-col w-full overflow-y-hidden">
      <div className="flex justify-between">
        <div className="shadow-[8px_0_15px_rgba(255,255,255,0.1)] pr-8 max-w-[400px]">
          <h1 className="text-[42px]">
            <b>Comanda:</b> {command.id}
          </h1>
          <ul className="mt-4 border-b-1 border-b-gray-400 pb-8">
            <li>
              <b>Cliente:</b> {clientName}
            </li>
            <li>
              <b>Funcionário:</b> {employeeName}
            </li>
            <li>
              <b>Data Abertura:</b> {formatDateTime(command.dataHoraAbertura)}
            </li>
            <li>
              <b>Data Fechamento:</b>{" "}
              {formatDateTime(command.dataHoraFechamento)}
            </li>
            <li>
              <b>Desconto:</b> {command.desconto}%
            </li>
            <li>
              <b>Valor Total:</b> R$ {calculateTotalValue()}
            </li>
            <li>
              <b>Status:</b> {command.status}
            </li>
            <div className="flex mt-6 gap-4">
              <PrimaryButton
                text={
                  command.status === "Aberta"
                    ? "Fechar Comanda"
                    : "Reabrir Comanda"
                }
                onClick={handleToggleCommandStatus}
              />
            </div>
          </ul>
          <div className="flex flex-col w-full flex-1">
            <div className="mt-4">
              {command.status !== "Fechada" ? (
                <form
                  onSubmit={handleAddProduct}
                  className="flex flex-col gap-4"
                >
                  <Select
                    text="Produto"
                    name="idProduto"
                    options={allProducts.map((product) => ({
                      id: product.id,
                      name: `${product.nomeProduto} (Estoque: ${product.qtdProduto})`, // Include stock in the display
                    }))}
                    handleOnChange={handleProductSelect}
                    value={newProduct.idProduto || ""}
                  />
                  <Input
                    type="number"
                    name="qtdProduto"
                    text={`Quantidade ${
                      newProduct.estoque
                        ? `(Disponível: ${newProduct.estoque})`
                        : ""
                    }`}
                    placeholder="Digite a quantidade"
                    handleOnChange={handleInputChange}
                    value={newProduct.qtdProduto}
                    min={1} // Prevent negative values
                    max={newProduct.estoque || ""} // Prevent exceeding stock
                  />
                  <Input
                    type="text"
                    name="valorUnitario"
                    text="Valor Unitário"
                    placeholder="Valor unitário"
                    handleOnChange={handleInputChange}
                    value={newProduct.valorUnitario}
                    disabled
                  />
                  <ConfirmButton type="submit" text="Adicionar Produto" />
                </form>
              ) : (
                <p className="text-gray-500 flex flex-wrap">
                  A comanda está fechada. Não é possível adicionar produtos.
                </p>
              )}
              <div className="flex mt-6">
                {command.status === "Fechada" && (
                  <DeleteButton
                    text="Deletar Comanda"
                    onClick={() => setIsDeleteModalOpen(true)} // Open delete modal
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full flex-1 ml-12">
          <h2 className="text-[32px] font-thin">Produtos na Comanda</h2>
          <Table
            headers={[
              { label: "ID", key: "idProduto" },
              { label: "Nome", key: "nomeProduto" },
              { label: "Quantidade", key: "qtdProduto" },
              { label: "Valor Unitário", key: "valorUnitario" },
              { label: "Valor Total", key: "valorTotal" },
              { label: "Ações", key: "actions" },
            ]}
            data={products.map((product) => ({
              ...product,
              valorTotal: `R$ ${(
                product.qtdProduto * product.valorUnitario
              ).toFixed(2)}`,
              actions: (
                <div className="flex gap-2">
                  <PrimaryButton
                    text="Editar"
                    onClick={() => handleEditCommandProduct(product)}
                    disabled={command.status === "Fechada"} // Disable if command is closed
                  />
                  <DeleteButton
                    text="Excluir"
                    onClick={() => handleRemoveProduct(product)}
                    disabled={command.status === "Fechada"} // Disable if command is closed
                  />
                </div>
              ),
            }))}
          />
          <ModalEditCommandProduct
            isOpen={isEditCommandProductModalOpen}
            onClose={() => setIsEditCommandProductModalOpen(false)}
            onSave={handleUpdateProduct}
            initialData={editingCommandProduct}
            allProducts={allProducts}
          />
          <ModalConfirmDelete
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={"Deletar Produto"}
            description={"Tem certeza de que deseja deletar este produto?"}
          />
          <ModalAddDiscount
            isOpen={isDiscountModalOpen}
            onClose={() => setIsDiscountModalOpen(false)}
            onConfirm={handleAddDiscount}
          />
          <ModalConfirmDelete
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteCommand}
            title={"Deletar Comanda"}
            description={"Tem certeza de que deseja deletar esta comanda?"}
          />
        </div>
      </div>
    </div>
  );
};

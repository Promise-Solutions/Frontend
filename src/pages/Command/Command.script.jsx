import { useState, useEffect } from "react";
import Input from "../../components/form/Input.jsx";
import Select from "../../components/form/Select.jsx"; // Import Select component
import ConfirmButton from "../../components/buttons/confirmButton/ConfirmButton.jsx"; // Import ConfirmButton component
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton.jsx";
import DeleteButton from "../../components/buttons/deleteButton/DeleteButton.jsx";
import Table from "../../components/tables/Table";
import ModalConfirmDelete from "../../components/modals/modalConfirmDelete/ModalConfirmDelete.jsx";
import ModalEditCommandProduct from "../../components/modals/modalEditCommandProduct/ModalEditCommandProduct.jsx";
import ModalAddDiscount from "../../components/modals/modalAddDiscount/ModalAddDiscount.jsx"; // Importa o novo modal
import { useCommandContext } from "../../context/CommandContext"; // Importa o BarContext
import { showToast } from "../../components/toastStyle/ToastStyle.jsx";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { axiosProvider } from "../../provider/apiProvider.js";
import { ROUTERS } from "../../constants/routers.js";
import { SyncLoader } from "react-spinners";

export const RenderCommandDetails = () => {
  const { command, setCommand, commandId, setCommandId } = useCommandContext(); // Usa o BarContext para obter a comanda
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    productQuantity: 0,
    unitValue: "",
    idProduct: null,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteCommandModalOpen, setIsDeleteCommandModalOpen] =
    useState(false);
  const navigate = useNavigate(); // Inicializa a função navigate

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

  // Lógica de reset de campos e busca de informações da comanda a cada interação
  useEffect(() => {
    if (!command) {
      setProducts([]);
      return;
    }

    fetchCommandDetails();
  }, [command?.id]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosProvider.get("/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!commandId) {
      setCommand(null); // Clear command when no commandId is set
      return;
    }

    const fetchCommandDetails = async () => {
      try {
        // Evita buscar detalhes se o estado atual já corresponde ao commandId
        if (command && command.id === commandId) {
          console.log("Comanda já carregada no estado.");
          return;
        }

        const endpoint = `/commands/${commandId}`;
        const response = await axiosProvider.get(endpoint);
        const commandData = response.data;

        if (commandData) {
          setCommand(commandData); // Atualiza o estado com os dados da comanda
        } else {
          console.error("Comanda não encontrada.");
          setCommand(null);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da comanda:", error);
        setCommand(null);
      }
    };

    fetchCommandDetails();
    setIsLoading(false);
  }, [commandId]); // Observa apenas commandId

  const fetchAllProducts = async () => {
    try {
      const response = await axiosProvider.get("/products");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar todos os produtos:", error);
    }
  };

  const fetchCommandDetails = async () => {
    try {
      // Fetch employee details
      const employeeResponse = await axiosProvider.get(`/employees`);
      const employee = employeeResponse.data.find(
        (emp) => emp.id === command.fkEmployee
      );
      setEmployeeName(employee ? employee.name : "Funcionário não encontrado");

      // Fetch client details
      if (command.fkClient) {
        const clientResponse = await axiosProvider.get(`/clients`);
        const client = clientResponse.data.find(
          (cli) => cli.id === command.fkClient
        );
        setClientName(client ? client.name : "Cliente não encontrado");
      } else {
        setClientName("Funcionário");
      }

      // Fetch products related to the command
      const productsResponse = await axiosProvider.get(
        `/command-products?fkComanda=${command.id}`
      );
      const allProductsResponse = await axiosProvider.get("/products");

      const productsData = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : []; // Ensure productsData is an array

      const enrichedProducts = productsData.map((product) => {
        const relatedProduct = allProductsResponse.data.find(
          (p) => p.id === product.fkProduct
        );
        return {
          ...product,
          name: relatedProduct ? relatedProduct.name : "Desconhecido",
          idProduto: relatedProduct ? relatedProduct.id : "N/A",
        };
      });

      setProducts(enrichedProducts);

      // Fetch updated command details
      const updatedCommand = await axiosProvider.get(`/commands/${command.id}`);
      setCommand(updatedCommand.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes da comanda:", error);
      setProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      const quantity = parseInt(value);
      if (quantity < 0) {
        showToast.error("A quantidade não pode ser negativa.");
        return;
      }
    }

    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (e) => {
    const selectedProductId = parseInt(e.target.value); // Ensure the ID is parsed as an integer
    const selectedProduct = allProducts.find(
      (product) => product.id === selectedProductId
    );

    if (selectedProduct) {
      setNewProduct({
        name: selectedProduct.name,
        quantity: 0,
        unitValue: selectedProduct.unitValue,
        stockQuantity: selectedProduct.quantity, // Set stock quantity
        idProduto: selectedProduct.id,
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.idProduto || newProduct.quantity <= 0) {
      showToast.error(
        "Por favor, selecione um produto e insira uma quantidade válida."
      );
      return;
    }

    if (newProduct.quantity > newProduct.stockQuantity) {
      showToast.error("A quantidade inserida excede o estoque disponível.");
      return;
    }

    try {
      const productToAdd = {
        fkProduct: newProduct.idProduto,
        fkCommand: command.id,
        productQuantity: parseInt(newProduct.quantity),
        unitValue: parseFloat(newProduct.unitValue).toFixed(2),
      };

      await axiosProvider.post("/command-products", productToAdd);
      
      setIsLoading(true);
      // Refetch command details and all products
      await fetchCommandDetails();
      await fetchAllProducts(); // Update stock information
      setIsLoading(false);

      // Clear inputs
      setNewProduct({
        name: "",
        quantity: 0,
        unitValue: "",
        stockQuantity: 0,
        idProduto: null,
      });

      showToast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      showToast.error("Erro ao adicionar produto.");
    }
  };

  const handleEditCommandProduct = (product) => {
    setEditingCommandProduct({
      ...product,
      productQuantity: product.productQuantity, // Map productQuantity to quantity for editing
      stockQuantity:
        allProducts.find((p) => p.id === product.fkProduct)?.quantity || 0, // Fetch stock quantity
    });
    setIsEditCommandProductModalOpen(true);
  };

  const handleRemoveProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosProvider.delete(`/command-products/${productToDelete.id}`);
      
      setIsLoading(true);
      // Refetch command details and all products
      await fetchCommandDetails();
      await fetchAllProducts(); // Update stock information
      setIsLoading(false);

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      showToast.error("Erro ao remover produto.");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    if (updatedProduct.qtdProduto > updatedProduct.stockQuantity) {
      showToast.error("A quantidade inserida excede o estoque disponível.");
      return;
    }

    try {
      const productToUpdate = {
        fkCommand: command.id,
        fkProduct: updatedProduct.idProduto,
        productQuantity: parseInt(updatedProduct.qtdProduto),
        unitValue: parseFloat(updatedProduct.valorUnitario),
      };

      await axiosProvider.patch(
        `/command-products/${editingCommandProduct.id}`,
        productToUpdate
      );

      setIsLoading(true);
      // Refetch command details and all products
      await fetchCommandDetails();
      await fetchAllProducts(); // Update stock information
      setIsLoading(false);

      setEditingCommandProduct(null);
      setIsEditCommandProductModalOpen(false);
      showToast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      showToast.error("Erro ao atualizar produto.");
    }
  };

  const calculateTotalValue = () => {
    return parseFloat(command.totalValue).toFixed(2); // Reflete o valor total do banco
  };

  const handleToggleCommandStatus = async () => {
    try {
      if (command.status === "OPEN") {
        setIsDiscountModalOpen(true);
      } else {
        await axiosProvider.patch(`/commands/${command.id}`, {
          status: "OPEN",
          commandNumber: command.commandNumber,
          closingDateTime: null,
          discount: 0.00,
          openingDateTime: command.openingDateTime,
          fkClient: command.fkClient,
          totalValue: command.totalValue,
          fkEmployee: command.fkEmployee,
        });

        // Refetch command details
        setIsLoading(true);
        await fetchCommandDetails();
        setIsLoading(false);

        showToast.success("Comanda reaberta com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao alterar status da comanda:", error);
      showToast.error("Erro ao alterar status da comanda.");
    }
  };

  const handleAddDiscount = async (discount) => {
    try {
      const now = new Date();
      const offset = -3; // Brasília timezone offset (UTC-3)
      const closingDateTime = new Date(
        now.getTime() + offset * 60 * 60 * 1000
      ).toISOString();

      await axiosProvider.patch(`/commands/${command.id}`, {
        status: "CLOSED",
        commandNumber: command.commandNumber,
        closingDateTime: closingDateTime,
        openingDateTime: command.openingDateTime,
        totalValue: command.totalValue,
        fkEmployee: command.fkEmployee,
        discount: discount.toFixed(2),
        fkClient: command.fkClient, // Keep the client associated
      });

      setIsLoading(true);
      // Refetch command details
      await fetchCommandDetails();
      setIsLoading(false);

      showToast.success("Desconto aplicado com sucesso!");
    } catch (error) {
      console.error("Erro ao aplicar desconto:", error);
      showToast.error("Erro ao aplicar desconto.");
    }
  };

  const handleDeleteCommand = async () => {
    try {
      // Fetch all items associated with the command
      const commandProductsResponse = await axiosProvider.get(
        `/command-products?fkComanda=${command.id}`
      );
      const commandProducts = commandProductsResponse.data;

      // Delete each item in commandProduct associated with the command
      for (const product of commandProducts) {
        await axiosProvider.delete(`/command-products/${product.id}`);
      }

      // Delete the command itself
      await axiosProvider.delete(`/commands/${command.id}`);

      // Clear the command context and redirect
      setCommand(null);
      setCommandId(null);
      sessionStorage.removeItem("commandId");
      console.log("Navigating to /bar after deleting command");
      navigate(ROUTERS.BAR); // Usa navigate para redirecionar

      showToast.success("Comanda e itens associados deletados com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar comanda e itens associados:", error);
      showToast.error("Erro ao deletar comanda.");
    }
  };

  const handleRemoveCommand = () => {
    setIsDeleteCommandModalOpen(true); // Abre o modal para deletar a comanda
  };

  if (!command) {
    return <p>Carregando detalhes da comanda...</p>;
  }

  return (
    <div className="flex flex-col w-full overflow-y-hidden">
      <div className="flex justify-between">
        <div className="shadow-[8px_0_15px_rgba(255,255,255,0.1)] pr-8 max-w-[400px]">
          {isLoading ? (
            <div className="w-[400px] h-full flex justify-center items-center">
              <SyncLoader
                size={8}
                loading={true}
                color={"#02AEBA"}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <>
              <h1 className="text-[42px]">
                <b>Comanda:</b> {command.commandNumber}
              </h1>
              <ul className="mt-4 border-b-1 border-b-gray-400 pb-8">
                <li>
                  <b>Cliente:</b> {clientName}
                </li>
                <li>
                  <b>Funcionário:</b> {employeeName}
                </li>
                <li>
                  <b>Data Abertura:</b>{" "}
                  {formatDateTime(command.openingDateTime)}
                </li>
                <li>
                  <b>Data Fechamento:</b>{" "}
                  {formatDateTime(command.closingDateTime)}
                </li>
                <li>
                  <b>Desconto:</b> {command.discount}%
                </li>
                <li>
                  <b>Valor Total:</b> R$ {calculateTotalValue()}
                </li>
                <li>
                  <b>Status:</b>{" "}
                  {command.status == "OPEN" ? "Aberta" : "Fechada"}
                </li>
              </ul>
              <div className="flex flex-col w-full flex-1">
                <div className="mt-4">
                  {command.status !== "CLOSED" ? (
                    <form
                      onSubmit={handleAddProduct}
                      className="flex flex-col gap-4"
                    >
                      <Select
                        text="Produto"
                        name="idProduto"
                        required
                        options={
                          allProducts.length != 0
                            ? allProducts.map((product) => ({
                                id: product.id,
                                name: `${product.name} (Estoque: ${product.quantity})`, // Display stock quantity
                              }))
                            : []
                        }
                        handleOnChange={handleProductSelect}
                        value={newProduct.idProduto || ""}
                      />
                      <Input
                        type="number"
                        name="quantity"
                        required
                        text={`Quantidade ${
                          newProduct.stockQuantity
                            ? `(Disponível: ${newProduct.stockQuantity})`
                            : ""
                        }`} // Display available stock
                        placeholder="Digite a quantidade"
                        handleOnChange={handleInputChange}
                        value={newProduct.quantity}
                        min={1} // Prevent negative values
                        max={newProduct.stockQuantity || ""} // Prevent exceeding stock
                      />
                      <Input
                        type="text"
                        name="unitValue"
                        required
                        text="Valor Unitário"
                        placeholder="Valor unitário"
                        handleOnChange={handleInputChange}
                        value={newProduct.unitValue}
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
                    {command.status === "CLOSED" && (
                      <DeleteButton
                        text="Deletar Comanda"
                        onClick={handleRemoveCommand} // Usa o estado correto para deletar a comanda
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 w-full flex-1 ml-12">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-[32px] font-thin">Produtos na Comanda</h2>
            <PrimaryButton
              text={
                command.status === "OPEN" ? "Fechar Comanda" : "Reabrir Comanda"
              }
              onClick={handleToggleCommandStatus}
            />
          </div>
          {isLoading ? (
            <SyncLoader
              size={8}
              loading={true}
              color={"#02AEBA"}
              speedMultiplier={2}
            />
          ) : (
            <Table
              headers={[
                { label: "ID", key: "idProduto" },
                { label: "Nome", key: "name" },
                { label: "Quantidade", key: "productQuantity" },
                { label: "Valor Unitário", key: "unitValue" },
                { label: "Valor Total", key: "totalValue" },
                { label: "Ações", key: "actions" },
              ]}
              data={products.map((product) => ({
                ...product,
                unitValue: `R$ ${parseFloat(product.unitValue).toFixed(2)}`,
                totalValue: `R$ ${parseFloat(
                  product.productQuantity * product.unitValue
                ).toFixed(2)}`,
                actions: (
                  <div className="flex gap-2">
                    <PrimaryButton
                      text="Editar"
                      onClick={() => handleEditCommandProduct(product)}
                      disabled={command.status === "CLOSED"} // Disable if command is closed
                    />
                    <DeleteButton
                      text="Excluir"
                      onClick={() => handleRemoveProduct(product)}
                      disabled={command.status === "CLOSED"} // Disable if command is closed
                    />
                  </div>
                ),
              }))}
              elementMessageNotFound="produto"
            />
          )}
          <ModalEditCommandProduct
            isOpen={isEditCommandProductModalOpen}
            onClose={() => setIsEditCommandProductModalOpen(false)}
            onSave={handleUpdateProduct}
            initialData={editingCommandProduct} // Pass the correct initial data
            allProducts={allProducts}
          />
          <ModalConfirmDelete
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={"Deletar Produto"}
            description={
              "Tem certeza de que deseja deletar este produto? Os itens retornarão ao estoque."
            }
          />
          <ModalAddDiscount
            isOpen={isDiscountModalOpen}
            onClose={() => setIsDiscountModalOpen(false)}
            onConfirm={handleAddDiscount}
          />
          <ModalConfirmDelete
            isOpen={isDeleteCommandModalOpen} // Usa o estado correto para deletar a comanda
            onClose={() => setIsDeleteCommandModalOpen(false)}
            onConfirm={handleDeleteCommand}
            title={"Deletar Comanda"}
            description={
              "Tem certeza de que deseja deletar esta comanda? Os itens associados serão também deletados!"
            }
          />
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import Table from "../../components/tables/Table";
import { useBarContext } from "../../context/BarContext"; // Importa o BarContext

export const RenderCommandDetails = () => {
  const { command, setId } = useBarContext(); // Usa o BarContext para obter a comanda
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nomeProduto: "",
    qtdProduto: 0,
    valorUnitario: "",
  });

  useEffect(() => {
    if (!command) {
      setProducts([]); // Limpa os produtos se a comanda não estiver carregada
      return;
    }

    const fetchCommandProducts = async () => {
      try {
        const productsResponse = await axios.get(
          `http://localhost:5000/commandProduct?fkComanda=${command.id}`
        );
        const allProductsResponse = await axios.get(
          "http://localhost:5000/products"
        );

        // Mapear os produtos relacionados à comanda com seus nomes e IDs
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
        console.error("Erro ao buscar produtos da comanda:", error);
        setProducts([]); // Garante que o estado seja limpo em caso de erro
      }
    };

    fetchCommandProducts();
  }, [command]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        fkComanda: command.id,
        qtdProduto: parseInt(newProduct.qtdProduto),
        valorUnitario: parseFloat(newProduct.valorUnitario).toFixed(2),
      };

      const response = await axios.post(
        "http://localhost:5000/commandProduct",
        productToAdd
      );
      setProducts((prev) => [...prev, response.data]);
      setNewProduct({ nomeProduto: "", qtdProduto: 0, valorUnitario: "" });
      toast.success("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto.");
    }
  };

  const calculateTotalValue = () => {
    return products
      .reduce(
        (sum, product) =>
          sum + parseFloat(product.valorUnitario) * product.qtdProduto,
        0
      )
      .toFixed(2);
  };

  const handleToggleCommandStatus = async () => {
    try {
      const updatedStatus = command.status === "Aberta" ? "Fechada" : "Aberta";
      const updatedCommand = {
        ...command,
        status: updatedStatus,
        dataHoraFechamento:
          updatedStatus === "Fechada" ? new Date().toISOString() : null,
      };

      await axios.put(
        `http://localhost:5000/commands/${command.id}`,
        updatedCommand
      );
      setId(command.id); // Atualiza o ID no contexto
      toast.success(
        `Comanda ${
          updatedStatus === "Fechada" ? "fechada" : "reaberta"
        } com sucesso!`
      );
    } catch (error) {
      console.error("Erro ao alterar status da comanda:", error);
      toast.error("Erro ao alterar status da comanda.");
    }
  };

  if (!command) {
    return <p>Carregando detalhes da comanda...</p>;
  }

  return (
    <div className="w-full">
      <h1 className="text-[42px]">
        <b>Comanda:</b> {command.id}
      </h1>
      <ul className="mt-4">
        <li>
          <b>Status:</b> {command.status}
        </li>
        <li>
          <b>Data Abertura:</b> {command.dataHoraAbertura}
        </li>
        <li>
          <b>Data Fechamento:</b> {command.dataHoraFechamento || "Ainda aberta"}
        </li>
        <li>
          <b>Desconto:</b> {command.desconto}
        </li>
        <li>
          <b>Valor Total:</b> R$ {calculateTotalValue()}
        </li>
      </ul>

      <PrimaryButton
        text={
          command.status === "Aberta" ? "Fechar Comanda" : "Reabrir Comanda"
        }
        onClick={handleToggleCommandStatus}
      />

      <div className="mt-6">
        <h2 className="text-[32px]">Produtos na Comanda</h2>
        <Table
          headers={[
            { label: "ID", key: "idProduto" },
            { label: "Nome", key: "nomeProduto" },
            { label: "Quantidade", key: "qtdProduto" },
            { label: "Valor Unitário", key: "valorUnitario" },
            { label: "Valor Total", key: "valorTotal" },
          ]}
          data={products.map((product) => ({
            ...product,
            valorTotal: `R$ ${(
              product.qtdProduto * product.valorUnitario
            ).toFixed(2)}`,
          }))}
        />
      </div>

      {command.status !== "Fechada" && (
        <div className="mt-6">
          <h2 className="text-[32px]">Adicionar Produto</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <Input
              type="text"
              name="nomeProduto"
              text="Nome do Produto"
              placeholder="Digite o nome do produto"
              value={newProduct.nomeProduto}
              handleOnChange={handleInputChange}
            />
            <Input
              type="number"
              name="qtdProduto"
              text="Quantidade"
              placeholder="Digite a quantidade"
              value={newProduct.qtdProduto}
              handleOnChange={handleInputChange}
            />
            <Input
              type="text"
              name="valorUnitario"
              text="Valor Unitário"
              placeholder="Digite o valor unitário"
              value={newProduct.valorUnitario}
              handleOnChange={handleInputChange}
            />
            <SubmitButton text="Adicionar Produto" />
          </form>
        </div>
      )}
    </div>
  );
};

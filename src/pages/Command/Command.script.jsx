import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import toast from "react-hot-toast";

export const RenderCommandDetails = () => {
  const { idCommand } = useParams(); // Obtém o ID da comanda da URL
  const [command, setCommand] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nomeProduto: "",
    qtdProduto: 0,
    valorUnitario: "",
  });

  useEffect(() => {
    const fetchCommandDetails = async () => {
      try {
        const commandResponse = await axios.get(
          `http://localhost:5000/commands/${idCommand}`
        );
        setCommand(commandResponse.data);

        const productsResponse = await axios.get(
          `http://localhost:5000/commandProduct?fkComanda=${idCommand}`
        );
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da comanda:", error);
      }
    };

    fetchCommandDetails();
  }, [idCommand]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        fkComanda: idCommand,
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

  return (
    <div className="w-full">
      {command ? (
        <>
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
              <b>Data Fechamento:</b>{" "}
              {command.dataHoraFechamento || "Ainda aberta"}
            </li>
            <li>
              <b>Desconto:</b> {command.desconto}
            </li>
          </ul>

          <div className="mt-6">
            <h2 className="text-[32px]">Produtos na Comanda</h2>
            <ul className="mt-4">
              {products.map((product) => (
                <li key={product.idComandaProduto}>
                  <b>Produto:</b> {product.nomeProduto} | <b>Quantidade:</b>{" "}
                  {product.qtdProduto} | <b>Valor Unitário:</b> R${" "}
                  {product.valorUnitario}
                </li>
              ))}
            </ul>
          </div>

          {/* Hide the "Adicionar Produto" section if the command is closed */}
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
        </>
      ) : (
        <p>Carregando detalhes da comanda...</p>
      )}
    </div>
  );
};

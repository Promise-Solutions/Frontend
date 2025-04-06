import React from "react";
import PrimaryButton from "../primaryButton/PrimaryButton";
import DeleteButton from "../deleteButton/DeleteButton";

const StockTable = ({ products, onEdit, onDelete }) => {
  return (
    <div
      className="overflow-y-auto max-h-[500px] h-auto 2xl:max-h-[670px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-700 px-4 py-2">Id</th>
            <th className="border border-gray-700 px-4 py-2">Nome</th>
            <th className="border border-gray-700 px-4 py-2">Quantidade</th>
            <th className="border border-gray-700 px-4 py-2">Valor Unitário</th>
            <th className="border border-gray-700 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-700 px-4 py-2">{product.id}</td>
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
                    onClick={() => onEdit(product)}
                  />
                  <DeleteButton
                    text="Excluir"
                    onClick={() => onDelete(product)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

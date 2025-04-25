import React from "react";
import PrimaryButton from "../buttons/primaryButton/PrimaryButton";
import DeleteButton from "../buttons/deleteButton/DeleteButton";

const StockTable = ({ products, onEdit, onDelete }) => {
  return (
    <div
      className="overflow-y-auto max-h-[500px] h-auto 2xl:max-h-[670px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      {products.length > 0 ? (
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="text-[1.25rem] bg-[#9a337977]">
              <th className="border border-gray-700 text-center px-7 py-2">
                Id
              </th>
              <th className="border border-gray-700 text-center px-7 py-2">
                Nome
              </th>
              <th className="border border-gray-700 text-center px-7 py-2">
                Quantidade
              </th>
              <th className="border border-gray-700 text-center px-7 py-2">
                Valor Unitário
              </th>
              <th className="border border-gray-700 text-center px-7 py-2">
                Valor Compra
              </th>
              <th className="border border-gray-700 text-center px-7 py-2">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-[#02AEBA10]">
                <td className="border border-gray-700 text-center px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-700 text-center px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-700 text-center px-4 py-2">
                  {product.quantity}
                </td>
                <td className="border border-gray-700 text-center px-4 py-2">
                  R$ {Number(product.unitValue).toFixed(2)}
                </td>
                <td className="border border-gray-700 text-center px-4 py-2">
                  R$ {Number(product.buyValue).toFixed(2)}
                </td>
                <td className="border border-gray-700 text-center px-4 py-2">
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
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-400">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
};

export default StockTable;

import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div
      className="overflow-y-auto max-h-[500px] h-auto 2xl:max-h-[670px] mt-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      {data?.length > 0 ? (
        <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border bg-[#9a337977] text-center text-[1.25rem] border-gray-700 px-7 py-2">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-700 text-center px-4 bg-[#02AEBA10] py-2"
                >
                  {typeof row[header.key] === "string" ||
                  typeof row[header.key] === "number"
                    ? row[header.key]
                    : row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      ): (
        <span className="text-center text-gray-400">Nenhum serviço encontrado</span>
      )}
    </div>
  );
};

export default Table;

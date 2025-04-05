import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div
      className="overflow-y-auto max-h-[500px] h-auto 2xl:max-h-[670px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-700 px-4 py-2">
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
                  className="border border-gray-700 px-4 py-2"
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

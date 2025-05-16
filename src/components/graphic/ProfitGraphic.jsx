import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import { useState } from "react";

const ProfitGraphic = ({ title }) => {
  // Exemplo com valores negativos para ilustrar déficit
  const mockData = [
    { name: "Total", Entrada: 24000, Saída: 25000, Lucro: -1000 },
  ];

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Entrada, Saída e Lucro"}
        </h2>
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            className="cursor-pointer"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="10" fill="#1976D2" />
            <text
              x="10"
              y="15"
              textAnchor="middle"
              fontSize="13"
              fill="white"
              fontWeight="bold"
            >
              i
            </text>
          </svg>
          {showInfo && (
            <div className="absolute left-6 top-1 z-10 bg-[#1E1E1E] text-white text-xs rounded px-3 py-2 border border-pink-zero w-56 shadow-lg">
              Mostra o total de entradas, saídas e lucro geral do sistema. Caso
              o valor seja negativo, o gráfico mostra o déficit com a barra para
              baixo.
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={mockData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value, name) => [
              `R$ ${value.toLocaleString("pt-BR")}`,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#1E1E1E",
              border: "1px solid var(--color-pink-zero)",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              color: "white",
              fontSize: "14px",
              paddingBottom: "16px",
            }}
          />
          <ReferenceLine y={0} stroke="#fff" />
          <Bar dataKey="Entrada" fill="#1976D2" />
          <Bar dataKey="Saída" fill="#64B5F6" />
          <Bar dataKey="Lucro" fill="#90CAF9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitGraphic;

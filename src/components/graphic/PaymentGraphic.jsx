import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const PaymentGraphic = ({ title }) => {
  const mockData = [
    { name: "Ensaio Musical", Entrada: 5000 },
    { name: "Podcast", Entrada: 3000 },
    { name: "Estúdio Fotográfico", Entrada: 2000 },
  ];

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Pagamentos"}
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
            <circle cx="10" cy="10" r="10" fill="#388E3C" />
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
              Mostra o faturamento de cada categoria de serviço oferecido.
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={mockData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
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
          <Bar dataKey="Entrada" fill="#388E3C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentGraphic;

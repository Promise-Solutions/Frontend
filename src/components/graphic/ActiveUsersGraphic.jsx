import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const ActiveUsersGraphic = ({ title }) => {
  const COLORS = ["#02AEBA", "#027B8A"];
  const mockData = [
    { name: "Mensais Ativos", value: 150 },
    { name: "Avulsos Ativos", value: 50 },
  ];
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Usuários Ativos"}
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
            <circle cx="10" cy="10" r="10" fill="#02AEBA" />
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
              Mostra a quantidade de clientes ativos, separados por tipo de
              vínculo (mensalistas e avulsos).
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={mockData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            label
          >
            {mockData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              <span
                style={{ color: props.payload.fill }}
              >{`${value} usuários`}</span>,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#1E1E1E",
              border: "1px solid var(--color-pink-zero)",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
            itemStyle={{
              color: "white",
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersGraphic;

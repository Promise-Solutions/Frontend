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

const ProfitGraphic = ({ title }) => {
  const mockData = [
    { name: "Total", Entrada: 24000, Saída: 11500, Lucro: 12500 },
  ];

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%]">
      <h2 className="text-white text-xl font-semibold mb-4">
        {title || "Entrada, Saída e Lucro"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
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
              backgroundColor: "#1E1E1E", // bg-[#1E1E1E] without opacity
              border: "1px solid var(--color-pink-zero)", // border-pink-zero
              color: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right" // Changed to top-right
            iconType="circle"
            wrapperStyle={{
              color: "white",
              fontSize: "14px",
              paddingBottom: "16px", // Updated padding bottom
            }}
          />
          <Bar dataKey="Entrada" fill="#4CAF50" />
          <Bar dataKey="Saída" fill="#F44336" />
          <Bar dataKey="Lucro" fill="#02AEBA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitGraphic;

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ActiveUsersGraphic = ({ title }) => {
  const COLORS = ["#02AEBA", "#FFC107"];
  const mockData = [
    { name: "Mensais Ativos", value: 150 },
    { name: "Avulsos Ativos", value: 50 },
  ];

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%]">
      <h2 className="text-white text-xl font-semibold mb-4">
        {title || "Usuários Ativos"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
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
              backgroundColor: "#1E1E1E", // bg-[#1E1E1E]
              border: "1px solid var(--color-pink-zero)", // border-pink-zero
              color: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
            itemStyle={{
              color: "white", // Tooltip font color
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersGraphic;

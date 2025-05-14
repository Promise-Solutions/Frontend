import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GoalGraphic = ({ title }) => {
  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Atual -> Gap, Gap -> Meta, Meta -> Atual
  const totalMeta = 10000; // Total meta value
  const atual = 7000; // Current progress
  const gap = totalMeta - atual; // Remaining gap
  const meta = totalMeta * 0.8; // Meta is 80% of the total

  const mockData = [
      { name: "Meta", value: meta },
      { name: "Atual", value: atual },
      { name: "Gap", value: gap },
  ];

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%]">
      <h2 className="text-white text-xl font-semibold mb-4">
        {title || "Meta"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          {/* Meta Layer (80% of Total) */}
          <Pie
            data={[mockData[0]]} // Only "Meta"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="80%"
            startAngle={450} // Start at the top (clockwise)
            endAngle={450 - (360 * meta) / totalMeta} // 80% of the circle
            fill="#8884d8"
          >
            <Cell fill={COLORS[0]} /> {/* Meta color -> Atual */}
          </Pie>
          {/* Atual Layer (Progress) */}
          <Pie
            data={[mockData[1]]} // Only "Atual"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="70%"
            startAngle={450} // Start at the top (clockwise)
            endAngle={450 - (360 * atual) / totalMeta} // Partial circle based on progress
            fill="#8884d8"
          >
            <Cell fill={COLORS[1]} /> {/* Atual color -> Gap */}
          </Pie>
          {/* Gap Layer (Remaining) */}
          <Pie
            data={[mockData[2]]} // Only "Gap"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="60%"
            startAngle={450} // Start at the top (clockwise)
            endAngle={450 - (360 * gap) / totalMeta} // Partial circle based on remaining gap
            fill="#8884d8"
          >
            <Cell fill={COLORS[2]} /> {/* Gap color -> Meta */}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              <span
                style={{ color: props.payload.fill }}
              >{`R$ ${value.toLocaleString("pt-BR")}`}</span>,
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

export default GoalGraphic;

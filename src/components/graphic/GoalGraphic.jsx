import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const GoalGraphic = ({ title }) => {
  // Monocromático cyan-zero, mas com diferenciação perceptível
  const COLORS = [
    "var(--color-cyan-zero)", // principal
    "#4fdbe3", // cyan-zero + lighten
    "#b2f6fa", // cyan-zero + much lighter
  ];
  const totalMeta = 10000;
  const atual = 7000;
  const gap = totalMeta - atual;
  const meta = totalMeta;

  const mockData = [
    { name: "Meta", value: meta },
    { name: "Atual", value: atual },
    { name: "Gap", value: gap },
  ];

  const [showInfo, setShowInfo] = useState(false);

  const metaMaxPercent = 0.8;
  const metaAngle = 360 * metaMaxPercent;
  const metaEndAngle = 450 - metaAngle;

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Meta"}
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
            <circle cx="10" cy="10" r="10" fill="var(--color-cyan-zero)" />
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
              Mostra o progresso em relação à meta financeira definida.
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={[mockData[0]]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="80%"
            startAngle={450}
            endAngle={metaEndAngle}
            fill="#8884d8"
          >
            <Cell fill={COLORS[0]} />
          </Pie>
          <Pie
            data={[mockData[1]]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="70%"
            startAngle={450}
            endAngle={450 - (360 * atual) / totalMeta}
            fill="#8884d8"
          >
            <Cell fill={COLORS[1]} />
          </Pie>
          <Pie
            data={[mockData[2]]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="60%"
            startAngle={450}
            endAngle={450 - (360 * gap) / totalMeta}
            fill="#8884d8"
          >
            <Cell fill={COLORS[2]} />
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              <span
                style={{ color: props.payload.fill }}
              >{`R$ ${value.toLocaleString("pt-BR")}`}</span>,
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

export default GoalGraphic;

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import { getCategoryTranslated } from "../../hooks/translateAttributes";

const FrequencyGraphic = ({ title }) => {
  // Frequência geral: monocromático cyan-zero
  const COLORS = [
    "var(--color-cyan-zero)",
    "#4fdbe3", // cyan-zero + lighten
    "#b2f6fa", // cyan-zero + much lighter
  ];
  // Frequência por categoria: monocromático pink-zero, mas com maior diferenciação
  const CATEGORY_COLORS = [
    "var(--color-pink-zero)",
    "#c05a9e", // pink-zero + lighten
    "#e6b3d6", // pink-zero + much lighter
  ];
  const mockData = [
    { name: "Mensais", value: 120 },
    { name: "Avulsos", value: 80 },
  ];
  const categoryData = [
    { name: getCategoryTranslated("MUSIC_REHEARSAL"), value: 50 },
    { name: getCategoryTranslated("PODCAST"), value: 70 },
    { name: getCategoryTranslated("PHOTO_VIDEO_STUDIO"), value: 80 },
  ];
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Frequência"}
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
            <div className="absolute left-6 top-1 z-10 bg-[#1E1E1E] text-white text-xs rounded px-3 py-2 border border-pink-zero w-60 shadow-lg">
              O primeiro gráfico mostra a frequência de uso do espaço por
              clientes mensais e avulsos. O segundo mostra a frequência por
              categoria de serviço.
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
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
                    style={{ color: props.payload?.fill }}
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
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-category-${index}`}
                    fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  <span
                    style={{ color: props.payload?.fill }}
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
      </div>
    </div>
  );
};

export default FrequencyGraphic;

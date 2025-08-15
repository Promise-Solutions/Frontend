import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";

const GoalGraphic = ({ title }) => {
  // Paleta de cores vivas e bem distintas
  const COLORS = [
    "#4CAF50", // meta (verde vivo)
    "#FFEB3B", // atual (amarelo vivo)
    "#FF5252", // gap (vermelho vivo)
  ];

  const [meta, setMeta] = useState(0);
  const [lucro, setLucro] = useState(0);
  const [gap, setGap] = useState(0);

  useEffect(() => {
    // Busca a meta
    axiosProvider
      .get("/goals/recent")
      .then((res) => {
        const goalValue = res.data.goal || 0;
        setMeta(goalValue);

        // Busca o lucro atual
        axiosProvider
          .get("/dashboard/balances")
          .then((res2) => {
            const profit = res2.data.profitOrLoss || 0;
            setLucro(profit);
            setGap(goalValue - profit);
          })
          .catch(() => {
            setLucro(0);
            setGap(goalValue);
          });
      })
      .catch(() => {
        setMeta(0);
        setLucro(0);
        setGap(0);
      });
  }, []);

  const mockData = [
    { name: "Meta", value: meta },
    { name: "Atual", value: lucro },
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
            <circle cx="10" cy="10" r="10" fill={COLORS[0]} />
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
        {meta === 0 && lucro === 0 && gap === 0 ? (
          <div className="text-white text-center pt-16">
            Sem dados para exibir
          </div>
        ) : (
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
              endAngle={meta > 0 ? 450 - (360 * lucro) / meta : 450}
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
              endAngle={meta > 0 ? 450 - (360 * gap) / meta : 450}
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
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default GoalGraphic;

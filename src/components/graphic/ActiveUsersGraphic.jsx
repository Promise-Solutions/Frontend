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

const ActiveUsersGraphic = ({ title }) => {
  const [data, setData] = useState([]);

  // Corrija o nome da função para consistência
  const fetchData = async () => {
    try {
      const response = await axiosProvider.get("/dashboard/actives");
      const dataObj = await response.data;

      const formattedData = [
        { name: "Mensalistas", value: dataObj.monthly || 0 },
        { name: "Avulsos", value: dataObj.single || 0 },
      ];

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching active users data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const COLORS = ["#02AEBA", "#027B8A"];
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
        {data.length > 0 && !(data[0].value === 0 && data[1].value === 0) ? (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
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
        ) : (
          <div className="text-white text-center pt-16">
            Sem dados para exibir
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersGraphic;

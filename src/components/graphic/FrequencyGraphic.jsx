import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { getCategoryTranslated } from "../../hooks/translateAttributes";
import { axiosProvider } from "../../provider/apiProvider";

const FrequencyGraphic = ({ title }) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosProvider.get("/dashboard/frequencys");
      const dataObj = response.data;

      // Monta os dados para o gráfico geral
      const formattedData = [
        { name: "Mensal", value: dataObj.frequencyMonthly || 0 },
        { name: "Avulso", value: dataObj.frequencySingle || 0 },
      ];

      // Monta os dados para o gráfico por categoria
      const formattedCategoryData = [
        {
          name: getCategoryTranslated("MR"),
          value: dataObj.frequencyByMr || 0,
        },
        {
          name: getCategoryTranslated("PC"),
          value: dataObj.frequencyByPc || 0,
        },
        {
          name: getCategoryTranslated("PV"),
          value: dataObj.frequencyByPv || 0,
        },
      ];

      setData(formattedData);
      setCategoryData(formattedCategoryData);
    } catch (error) {
      console.error("Error fetching frequency data:", error);
      setData([]);
      setCategoryData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Paleta de cores vivas e bem distintas
  const COLORS = [
    "#FF5252", // vermelho vivo
    "#FFEB3B", // amarelo vivo
    "#4CAF50", // verde vivo
    "#2196F3", // azul vivo
    "#FF9800", // laranja vivo
  ];
  // Frequência por categoria: cores vivas
  const CATEGORY_COLORS = [
    "#E040FB", // roxo vivo
    "#00E676", // verde neon
    "#FFEB3B", // amarelo vivo
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
            <circle cx="10" cy="10" r="10" fill="#FFEB3B" />
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
              O primeiro gráfico mostra a quantidade de atendimentos realizados
              por clientes mensais e avulsos. O segundo mostra os atendimentos
              por categoria de serviço.
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={220}>
            {data.length > 0 &&
            !(data[0].value === 0 && data[1].value === 0) ? (
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
                    <span style={{ color: props.payload?.fill }}>{`${value} ${
                      value == 1 ? "atendimento" : "atendimentos"
                    }`}</span>,
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
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={220}>
            {categoryData.length > 0 &&
            !(
              categoryData[0].value === 0 &&
              categoryData[1].value === 0 &&
              categoryData[2].value === 0
            ) ? (
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
                    <span style={{ color: props.payload?.fill }}>{`${value} ${
                      value == 1 ? "atendimento" : "atendimentos"
                    }`}</span>,
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
      </div>
    </div>
  );
};

export default FrequencyGraphic;

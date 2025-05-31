import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";

const BarGraphic = ({ title }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    axiosProvider
      .get("/dashboard/bar-balances") // Certifique-se que esta rota existe no backend
      .then((response) => {
        const dataObj = response.data;
        const formattedData = [
          {
            name: "Total",
            Entrada: dataObj.totalEntryValue || 0,
            Saída: dataObj.totalExpenseValue || 0,
            Lucro: dataObj.profitOrLoss || 0,
          },
        ];
        setData(formattedData);
        console.log("Bar data fetched:", formattedData);
      })
      .catch((error) => {
        console.error("Error fetching bar data:", error);
        setData([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [showInfo, setShowInfo] = useState(false);

  // Define a cor do Lucro dinamicamente
  const getLucroColor = (lucro) =>
    lucro < 0 ? "var(--color-red-zero)" : "#B39DDB";

  // Define o label do Lucro dinamicamente
  const getLucroLabel = (lucro) => (lucro < 0 ? "Perda" : "Lucro");

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-[100%] h-[100%] relative">
      <div className="flex items-center mb-4">
        <h2 className="text-white text-xl font-semibold mr-2">
          {title || "Bar"}
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
            <circle cx="10" cy="10" r="10" fill="#7E57C2" />
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
              Mostra o total de entrada, saída e lucro do bar. Caso o valor seja
              negativo, o gráfico mostra o déficit com a barra para baixo.
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        {data.length > 0 &&
        data[0].Entrada === 0 &&
        data[0].Saída === 0 &&
        data[0].Lucro === 0 ? (
          <div className="text-white text-center pt-16">
            Sem dados para exibir
          </div>
        ) : (
          <BarChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value, name) => {
                // Use os dados reais para determinar se é Lucro ou Perda
                if (name === "Lucro" && data.length > 0 && data[0].Lucro < 0) {
                  return [`R$ ${value.toLocaleString("pt-BR")}`, "Perda"];
                }
                return [`R$ ${value.toLocaleString("pt-BR")}`, name];
              }}
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
              payload={[
                {
                  value: "Entrada",
                  type: "circle",
                  color: "#7E57C2",
                  id: "Entrada",
                },
                {
                  value: "Saída",
                  type: "circle",
                  color: "#9575CD",
                  id: "Saída",
                },
                {
                  value:
                    data.length > 0 ? getLucroLabel(data[0].Lucro) : "Lucro",
                  type: "circle",
                  color:
                    data.length > 0 ? getLucroColor(data[0].Lucro) : "#B39DDB",
                  id: "Lucro",
                },
              ]}
            />
            <ReferenceLine y={0} stroke="#fff" />
            <Bar dataKey="Entrada" fill="#7E57C2" />
            <Bar dataKey="Saída" fill="#9575CD" />
            <Bar
              dataKey="Lucro"
              fill={data.length > 0 ? getLucroColor(data[0].Lucro) : "#B39DDB"}
              name={data.length > 0 ? getLucroLabel(data[0].Lucro) : "Lucro"}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphic;

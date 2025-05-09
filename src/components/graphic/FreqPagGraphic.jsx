import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { axiosProvider } from "../../provider/apiProvider";
import toast from "react-hot-toast";

const FreqPagGraphic = ({ idClient, title, isBar }) => {
  const [data, setData] = useState([]);
  const [bars, setBars] = useState([]);

  useEffect(() => {
    if (idClient) {
      axiosProvider
        .get(`dashboard/client-stats/${idClient}`)
        .then((response) => {
          console.log("Estatísticas do usuário:", response.data);
          if (response.data != null) {
            setData([
              { name: "Frequência", Frequência: response.data.frequency },
              {
                name: "Total Em Comandas",
                TotalEmComandas: response.data.totalCommandsValue,
              },
              {
                name: "Total Em Serviços",
                TotalEmServiços: response.data.totalValue,
              },
            ]);
            setBars([
              { dataKey: "Frequência", fill: "#9a3379" },
              { dataKey: "TotalEmComandas", fill: "#02AEBA" },
              { dataKey: "TotalEmServiços", fill: "#FF5733" },
            ]);
          } else {
            toast.error("Nenhum dado encontrado para o usuário.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar estatísticas do usuário:", error);
        });
    } else if (isBar) {
      axiosProvider
        .get(`dashboard/bar-finances`)
        .then((response) => {
          console.log("Estatísticas do bar:", response.data);
          if (response.data != null) {
            setData(response.data); // Assuma que os dados já estão no formato correto
            setBars([
              { dataKey: "Vendas Do Bar", fill: "#4CAF50" },
              { dataKey: "Despesas Do Bar", fill: "#F44336" },
              { dataKey: "Total De Comandas Fechadas", fill: "#02AEBA" },
            ]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar estatísticas do bar:", error);
        });
    } else {
      axiosProvider
        .get(`dashboard/general-stats`)
        .then((response) => {
          console.log("Estatísticas gerais:", response.data);
          if (response.data != null) {
            setData(response.data); // Assuma que os dados já estão no formato correto
            setBars([
              { dataKey: "Vendas", fill: "#2196F3" },
              { dataKey: "Lucro", fill: "#FFC107" },
            ]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar estatísticas gerais:", error);
        });
    }
  }, [idClient, isBar]);

  return (
    <div className="bg-white/5 border-1 border-pink-zero p-6 shadow-md w-full h-110">
      <h2 className="text-white text-xl font-semibold mb-4">
        {title || "Título não associado"}
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barCategoryGap="0%" barGap="0">
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 20 }}
          />
          {bars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.fill}
              barSize="100%"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FreqPagGraphic;

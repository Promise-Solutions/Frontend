import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FreqPagGraphic = ({ idUsuario }) => {
  const data = [
    { name: "MÊS 1", Frequência: 400, RetornoFinanceiro: 800 },
    { name: "MÊS 2", Frequência: 500, RetornoFinanceiro: 200 },
    { name: "MÊS 3", Frequência: 600, RetornoFinanceiro: 700 },
    { name: "MÊS 4", Frequência: 700, RetornoFinanceiro: 500 },
  ];

  return (
    <div className="bg-white/5 border  border-white/10 rounded-2xl p-6 shadow-md w-full h-[450px]">
      <h2 className="text-white text-xl font-semibold mb-4">
        Frequência x Pagamento
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#9a3379" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 20 }}
          />
          <Line
            type="monotone"
            dataKey="Frequência"
            stroke="#9a3379"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="RetornoFinanceiro"
            stroke="#02AEBA"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FreqPagGraphic;

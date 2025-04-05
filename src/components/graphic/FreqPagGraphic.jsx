import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const FreqPagGraphic = (idUsuario) => {
  const data = [
    { name: "MÊS 1", Frequência: 400, RetornoFinanceiro: 800 },
    { name: "MÊS 2", Frequência: 500, RetornoFinanceiro: 200 },
    { name: "MÊS 3", Frequência: 600, RetornoFinanceiro: 700 },
    { name: "MÊS 4", Frequência: 700, RetornoFinanceiro: 500 },
  ];

  const toolTipStyle = {
    color: "white",
    backgroundImage: "black",
  };

  const renderLineChart = (
    <LineChart width={1000} height={500} data={data}>
      <Legend />
      <Line type="monotone" dataKey="Frequência" stroke="#9a3379" />
      <Line type="monotone" dataKey="RetornoFinanceiro" stroke="#02AEBAFF" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip style={toolTipStyle} />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};

export default FreqPagGraphic;

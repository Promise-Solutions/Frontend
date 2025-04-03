import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const LineGrafic = () => {
  const data = [
    { name: "Page A", Frequência: 400, Pagamentos: 800},
    { name: "Page B", Frequência: 500, Pagamentos: 200},
    { name: "Page C", Frequência: 600, Pagamentos: 700},
    { name: "Page D", Frequência: 700, Pagamentos: 500}
    ];

    const toolTipStyle = {
      color: "white",
      backgroundImage: "black",
    };

    const renderLineChart = (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="Frequência" stroke="#9a3379" />
      <Line type="monotone" dataKey="Pagamentos" stroke="#02AEBAFF" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip style />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};

export default LineGrafic;

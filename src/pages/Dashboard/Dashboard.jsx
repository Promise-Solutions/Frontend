import FreqPagGraphic from "../../components/graphic/FreqPagGraphic";
import Kpi from "../../components/graphic/Kpi";
import Graphic from "../../components/graphic/Graphic";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      {/* KPIs */}
      <div className="flex justify-between items-center mb-6">
        <Kpi title="Total Usuários" value="1.200" />
        <Kpi title="Retorno Financeiro" value="R$ 50.000" />
        <Kpi title="Frequência Média" value="85%" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FreqPagGraphic width={500} height={300} />
          <FreqPagGraphic width={500} height={300} />
      </div>
    </div>
  );
};

export default Dashboard;

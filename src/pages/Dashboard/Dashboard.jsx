import FrequencyGraphic from "../../components/graphic/FrequencyGraphic";
import PaymentGraphic from "../../components/graphic/PaymentGraphic";
import BarGraphic from "../../components/graphic/BarGraphic";
import GoalGraphic from "../../components/graphic/GoalGraphic";
import ActiveUsersGraphic from "../../components/graphic/ActiveUsersGraphic";
import ProfitGraphic from "../../components/graphic/ProfitGraphic";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <p className="font-bold mb-4 text-yellow-zero">
        Os dados existentes na Dashboard, são referentes aos dados atuais do
        sistema, mantenha o sistema sempre atualizado :D
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FrequencyGraphic title="Frequência" />
        <ActiveUsersGraphic title="Usuários Ativos" />
        <PaymentGraphic title="Serviços" />
        <BarGraphic title="Bar" />
        <GoalGraphic title="Meta" />
        <ProfitGraphic title="Geral: Entrada, Saída e Lucro" />
      </div>
    </div>
  );
};

export default Dashboard;

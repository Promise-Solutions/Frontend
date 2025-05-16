import FrequencyGraphic from "../../components/graphic/FrequencyGraphic";
import PaymentGraphic from "../../components/graphic/PaymentGraphic";
import BarGraphic from "../../components/graphic/BarGraphic";
import GoalGraphic from "../../components/graphic/GoalGraphic";
import ActiveUsersGraphic from "../../components/graphic/ActiveUsersGraphic";
import ProfitGraphic from "../../components/graphic/ProfitGraphic";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";

const Dashboard = () => {
  const [lastDateUpdate, setLastDateUpdate] = useState();
  useEffect(() => {
    axiosProvider.get("/dashboard/last-update").then((response) => {
       const lastUpdate = response.data.lastUpdate;
      const formattedDate = new Date(lastUpdate).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastDateUpdate(formattedDate);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen py-2 md:pt-2 px-6 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <h1 className="text-2xl font-thin">Visualize as análises</h1>
      <div className="flex justify-between font-bold mb-4 text-gray-400">
        <p className="flex font-bold text-yellow-zero">
          Os dados existentes abaixo, são referentes aos dados atuais do
          sistema.
        </p>
        {`Última atualização: ${lastDateUpdate ? lastDateUpdate : "Carregando..."}`}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FrequencyGraphic title="Frequências" />
        <ActiveUsersGraphic title="Clientes Ativos" />
        <GoalGraphic title="Meta Geral" />
        <PaymentGraphic title="Faturamento Por Categoria" />
        <BarGraphic title="Finanças do Bar" />
        <ProfitGraphic title="Finanças Geral" />
      </div>
    </div>
  );
};

export default Dashboard;

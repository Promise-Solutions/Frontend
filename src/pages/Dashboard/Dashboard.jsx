import FrequencyGraphic from "../../components/graphic/FrequencyGraphic";
import PaymentGraphic from "../../components/graphic/PaymentGraphic";
import BarGraphic from "../../components/graphic/BarGraphic";
import GoalGraphic from "../../components/graphic/GoalGraphic";
import ActiveUsersGraphic from "../../components/graphic/ActiveUsersGraphic";
import ProfitGraphic from "../../components/graphic/ProfitGraphic";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { SyncLoader } from "react-spinners";

const Dashboard = () => {
  const [lastDateUpdate, setLastDateUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen py-2 md:pt-2 px-6 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <h1 className="text-2xl font-thin">Visualize as análises</h1>
        {
          isLoading ? (
            <div className="w-full h-full flex items-center justify-center "> 
              <SyncLoader
                size={8}
                loading={true}
                color={"#02AEBA"}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-between font-bold mb-4 text-gray-400">
              <p className="flex font-bold text-yellow-zero">
                Os dados existentes abaixo, são referentes aos dados atuais do
                sistema.
              </p>
              {`Última atualização: ${lastDateUpdate ? lastDateUpdate : "Carregando..."}`}
            </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <FrequencyGraphic title="Quantidade de Atendimentos Totais" />
                  <ActiveUsersGraphic title="Clientes Ativos Totais" />
                  <GoalGraphic title="Meta Geral Total" />
                  <PaymentGraphic title="Total de Faturamento Por Categoria" />
                  <BarGraphic title="Finanças Totais do Bar" />
                  <ProfitGraphic title="Finanças Gerais Totais" />
                </div>
            </>
          )
        }
      
    </div>
  );
};

export default Dashboard;

import FrequencyGraphic from "../../components/graphic/FrequencyGraphic";
import PaymentGraphic from "../../components/graphic/PaymentGraphic";
import BarGraphic from "../../components/graphic/BarGraphic";
import GoalGraphic from "../../components/graphic/GoalGraphic";
import ActiveUsersGraphic from "../../components/graphic/ActiveUsersGraphic";
import ProfitGraphic from "../../components/graphic/ProfitGraphic";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { SyncLoader } from "react-spinners";
import { extractDateOnly, formatDateWithoutTime } from "../../hooks/formatUtils";
import { IoMdRefresh } from "react-icons/io";
import { showToast } from "../../components/toastStyle/ToastStyle";

const Dashboard = () => {
  const [lastDateUpdate, setLastDateUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [renderKey, setRenderKey] = useState(Date.now());

  function handleRefresh() {
    setIsLoading(true);
    axiosProvider.get("/dashboard/recent-time").then((response) => {
      const lastUpdate = response.data;
      setLastDateUpdate(extractDateOnly(lastUpdate));
    });
    setIsLoading(false);
  }

  function handleRefreshAndCleanTrancing() {
    setIsLoading(true);
    axiosProvider.get("/dashboard/recent-time").then((response) => {
      const lastUpdate = response.data;
      setLastDateUpdate(extractDateOnly(lastUpdate));
    });
    axiosProvider.delete("/tracing");
    setIsLoading(false);
    setRenderKey(Date.now());
    showToast.success("Dados atualizados com sucesso!");
  }

  useEffect(() => {
    handleRefresh();
  }, []);


  return (
    <div className="slide-in-ltr flex flex-col min-h-screen py-2 md:pt-2 px-6 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <h1 className="text-2xl font-thin">Visualize as análises</h1>
      <div className="flex justify-between font-bold mb-4 text-gray-400">
        <p className="flex font-bold text-yellow-zero">
          Os dados existentes abaixo, são referentes aos dados atuais do
          sistema.
        </p>
        <span className="flex text-gray-400 text-sm">
          <span
            onClick={() => handleRefreshAndCleanTrancing()}
            title="Atualizar"
            className="text-pink-zero mr-1 cursor-pointer hover:text-cyan-zero transition-all duration-300 hover:scale-110 hover:rotate-360">
            <IoMdRefresh size={"24px"}/>
          </span>
          {`Última atualização: ${
            lastDateUpdate ? lastDateUpdate : "Carregando..."
          }`}
        </span>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center ">
          <SyncLoader
            size={8}
            loading={true}
            color={"#02AEBA"}
            speedMultiplier={2}
          />
        </div>
      ) : (
        <div key={renderKey}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FrequencyGraphic title="Quantidade de Atendimentos Totais" />
            <ActiveUsersGraphic title="Clientes Ativos Totais" />
            <GoalGraphic title="Meta Geral Total" />
            <PaymentGraphic title="Total de Faturamento Por Categoria" />
            <BarGraphic title="Finanças Totais do Bar" />
            <ProfitGraphic title="Finanças Gerais Totais" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

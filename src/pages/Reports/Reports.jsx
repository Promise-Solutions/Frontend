import { CiEraser } from "react-icons/ci";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import CardReport from "../../components/cards/cardReport/CardReport";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { ENDPOINTS } from "../../constants/endpoints";
import ModalConfirmDelete from "../../components/modals/modalConfirmDelete/ModalConfirmDelete";
import { showToast } from "../../components/toastStyle/ToastStyle";
import { SyncLoader } from "react-spinners";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Busca relatórios do backend
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await axiosProvider.get(ENDPOINTS.driveList());
      const files = Array.isArray(response.data) ? response.data : [];
      setAllReports(files);
      setReports(files);
    } catch (error) {
      setAllReports([]);
      setReports([]);
      showToast.error("Erro ao buscar relatórios.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Função para baixar relatório
  const handleDownload = async (fileName, fileId) => {
    await showToast.promise(
      (async () => {
        try {
          const response = await axiosProvider.get(
            ENDPOINTS.driveDownload(fileId),
            {
              responseType: "blob",
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          // Usa exatamente o nome original do arquivo gerado
          link.href = url;
          link.setAttribute("download", fileName || "relatorio.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          throw new Error("Erro ao baixar relatório.");
        }
      })(),
      {
        loading: "Baixando relatório...",
        success: "Download iniciado!",
        error: "Erro ao baixar relatório.",
      }
    );
  };

  // Função para abrir modal de exclusão
  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Confirma exclusão do relatório
  const confirmDelete = async () => {
    if (deleteIndex == null) return;
    const file = reports[deleteIndex];
    try {
      await axiosProvider.delete(ENDPOINTS.driveDelete(file.id));
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
      showToast.success("Relatório deletado com sucesso!");
      fetchReports();
    } catch (error) {
      showToast.error("Erro ao deletar relatório.");
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
    }
  };

  // Função para filtrar relatórios por data
  const parseDate = (str) => {
    // Espera-se que str seja no formato "YYYY-MM-DD" ou "DD/MM/YYYY"
    if (!str) return null;
    if (str.includes("/")) {
      const [day, month, year] = str.split("/");
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(str);
  };

  const handleFilter = () => {
    if (!dateFrom && !dateTo) {
      setReports(allReports);
      return;
    }
    setReports(
      allReports.filter((file) => {
        // Tenta pegar a data do nome do arquivo, ex: "Relatório Gerado em - 01/01/2024"
        let dateStr = file.name?.match(/\d{2}\/\d{2}\/\d{4}/)?.[0];
        if (!dateStr && file.createdTime) {
          // Usa a data de criação do arquivo se não encontrar no nome
          dateStr = file.createdTime.slice(0, 10);
        }
        const reportDate = parseDate(dateStr);
        let fromValid = true;
        let toValid = true;
        if (dateFrom) {
          fromValid = reportDate >= new Date(dateFrom);
        }
        if (dateTo) {
          toValid = reportDate <= new Date(dateTo);
        }
        return fromValid && toValid;
      })
    );
  };

  const handleClearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setReports(allReports);
  };

  // Função para gerar novo relatório (exemplo: download do endpoint)
  const handleGenerateReport = async () => {
    try {
      // Garante que a requisição seja feita corretamente e trate erros de status HTTP
      const response = await axiosProvider.get(
        ENDPOINTS.generateExcelReport(),
        {
          responseType: "blob",
          validateStatus: (status) => status >= 200 && status < 500, // Permite tratar erros manualmente
        }
      );
      if (response.status !== 200) {
        showToast.error("Erro ao gerar relatório. Status: " + response.status);
        return;
      }
      if (!response.data || response.data.size === 0) {
        showToast.error("O relatório retornou vazio.");
        return;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast.success("Relatório gerado com sucesso!");
      fetchReports();
    } catch (error) {
      // Mostra detalhes do erro no toast
      showToast.error(
        "Erro ao gerar relatório: " + (error?.message || "Erro desconhecido")
      );
      // Opcional: console.log(error) para debug
      // console.log(error);
    }
  };

  return (
    <>
      <div className="slide-in-ltr mx-16 my-6 text-white">
        <div className="flex pb-4 justify-between items-center">
          <h1 className="text-2xl font-thin">Gerencie seus Relatórios</h1>
          <div className="flex">
            <PrimaryButton
              id="generate_report_button_id"
              text="Gerar Relatório"
              onClick={handleGenerateReport}
            />
          </div>
        </div>
        <div className="flex bmt-4 pt-4 border-t-1 border-gray-600 justify-between mb-4"></div>
        <p className="text-yellow-zero">
          Você pode gerar um relatório agora ou visualizar os relatórios já
          existentes.
        </p>
        <div className="flex flex-wrap justify-end items-end gap-4 mb-10">
          <button
            id="clear_filter_report_button_id"
            className="flex items-center justify-center cursor-pointer text-pink-zero hover:text-cyan-zero transition text-3xl"
            onClick={handleClearFilters}
            title="Remover Filtros"
            style={{ lineHeight: 0 }}
          >
            <CiEraser size={"40px"} />
          </button>
          <label className="flex flex-col text-gray-400">
            <span>Período de: 00/00/0000</span>
            <input
              type="date"
              className="bg-black border border-pink-zero text-white px-4 py-2 w-[250px] focus:outline-none"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <label className="flex flex-col text-gray-400">
            <span>Período até: 00/00/0000</span>
            <input
              type="date"
              className="bg-black border border-pink-zero text-white px-4 py-2 w-[250px] focus:outline-none"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
          <PrimaryButton
            id="filter_report_button_id"
            text="Filtrar"
            onClick={handleFilter}
          />
        </div>
        <div className="max-h-[450px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="text-center text-gray-400 col-span-3">
                Carregando relatórios...
              </div>
            ) : isDownloading ? (
              <div className="flex flex-col items-center justify-center col-span-3 py-12">
                <SyncLoader size={10} color="#02AEBA" speedMultiplier={2} />
                <span className="mt-4 text-cyan-zero">
                  Baixando relatório...
                </span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center text-gray-400 col-span-3">
                Nenhum relatório encontrado.
              </div>
            ) : (
              reports.map((file, index) => (
                <CardReport
                  key={file.id}
                  id={file.id}
                  item={file.name}
                  onDownload={() => handleDownload(file.name, file.id)}
                  onDelete={() => handleDelete(index)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <ModalConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={"Deletar Relatório"}
        description={
          <span className="text-yellow-zero font-semibold">
            Tem certeza de que deseja deletar esse relatório? <br /> Não será
            possível recuperar!
          </span>
        }
      />
    </>
  );
};

export default Reports;

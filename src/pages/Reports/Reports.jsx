import { CiEraser } from "react-icons/ci";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CardReport from "../../components/cards/CardReport";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { ENDPOINTS } from "../../constants/endpoints";
import ModalConfirmDelete from "../../components/modals/ModalConfirmDelete";
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
    setIsDownloading(true)
    try {
      const response = await axiosProvider.get(ENDPOINTS.driveList());
      const files = Array.isArray(response.data) ? response.data : [];
      setAllReports(files);
      setReports(files);
    } catch (err) {
      setAllReports([]);
      setReports([]);
      showToast.error("Erro ao buscar relatórios.");
    }
    setIsLoading(false);
    setIsDownloading(false);
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
          // Ajusta o nome do arquivo para trocar datas de dd-mm-yyyy para dd/mm/yyyy
          let adjustedFileName = fileName;
          adjustedFileName = adjustedFileName.replace(
            /(\d{2})-(\d{2})-(\d{4})/,
            (match, d, m, y) => `${d}/${m}/${y}`
          );
          link.href = url;
          link.setAttribute("download", adjustedFileName || "relatorio.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (err) {
                showToast.error("Erro ao buscar relatórios.");
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
    } catch (err) {
      showToast.error("Erro ao buscar relatórios.");
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
        // Filtra pelo nome do arquivo, procurando datas no formato dd/mm/yyyy OU dd-mm-yyyy
        let dateStr =
          file.name?.match(/\d{2}[/-]\d{2}[/-]\d{4}/)?.[0] ||
          file.createdTime?.slice(0, 10);

        // Normaliza para dd/mm/yyyy para comparação
        if (dateStr && dateStr.includes("-")) {
          dateStr = dateStr.replace(/-/g, "/");
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
    await showToast.promise(
      (async () => {
        try {
          // Gera o relatório
          const response = await axiosProvider.get(
            ENDPOINTS.generateExcelReport(),
            {
              responseType: "blob",
              validateStatus: (status) => status >= 200 && status < 500,
            }
          );
          if (response.status !== 200) {
            throw new Error(
              "Erro ao gerar relatório. Status: " + response.status
            );
          }
          if (!response.data || response.data.size === 0) {
            throw new Error("O relatório retornou vazio.");
          }
          // Atualiza a lista de relatórios
          await fetchReports();

          // Aguarda a lista atualizar e pega o último relatório gerado
          // (assume que o novo relatório é o primeiro da lista)
          const latestReport =
            Array.isArray(allReports) && allReports.length > 0
              ? allReports[0]
              : null;

          // Se não encontrar, tenta buscar novamente
          let fileToDownload = latestReport;
          if (!fileToDownload) {
            const refreshed = await axiosProvider.get(ENDPOINTS.driveList());
            fileToDownload =
              Array.isArray(refreshed.data) && refreshed.data.length > 0
                ? refreshed.data[0]
                : null;
          }

          if (fileToDownload) {
            // Faz o download do novo relatório usando o nome exibido (com data formatada)
            let displayName = fileToDownload.name?.replace(
              /(\d{2})-(\d{2})-(\d{4})/,
              (match, d, m, y) => `${d}/${m}/${y}`
            );
            // Chama o endpoint de download
            const downloadResp = await axiosProvider.get(
              ENDPOINTS.driveDownload(fileToDownload.id),
              { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(
              new Blob([downloadResp.data])
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", displayName || "relatorio.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
          } else {
            throw new Error(
              "Não foi possível localizar o relatório gerado para download."
            );
          }
        } catch (error) {
          throw new Error(
            "Erro ao gerar relatório"
          );
        }
      })(),
      {
        loading: "Gerando relatório...",
        success: "Relatório gerado e baixado com sucesso!",
        error: (err) => err.message || "Erro ao gerar relatório.",
      }
    );
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
            <span>Período de:</span>
            <input
              type="date"
              className="bg-black border border-pink-zero text-white px-4 py-2 w-[250px] focus:outline-none"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <label className="flex flex-col text-gray-400">
            <span>Período até:</span>
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
            className="h-14"
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
              reports.map((file, index) => {
                // Ajusta a exibição do nome do arquivo para trocar datas de dd-mm-yyyy por dd/mm/yyyy
                let displayName = file.name?.replace(
                  /(\d{2})-(\d{2})-(\d{4})/,
                  (match, d, m, y) => `${d}/${m}/${y}`
                );
                return (
                  <CardReport
                    key={file.id}
                    id={file.id}
                    item={displayName}
                    onDownload={() => handleDownload(file.name, file.id)}
                    onDelete={() => handleDelete(index)}
                  />
                );
              })
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

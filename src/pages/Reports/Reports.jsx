import { CiEraser, CiFileOn } from "react-icons/ci";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import CardReport from "../../components/cards/cardReport/CardReport";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";

const Reports = () => {
  const allReports = [
    "Relatório - 01/01/2024",
    "Relatório - 10/01/2024",
    "Relatório - 15/02/2024",
    "Relatório - 20/03/2024",
    "Relatório - 05/04/2024",
    "Relatório - 10/05/2024",
    "Relatório - 25/05/2024",
    "Relatório - 01/06/2024",
    "Relatório - 15/06/2024",
    "Relatório - 30/06/2024",
    "Relatório - 10/07/2024",
    "Relatório - 20/07/2024",
  ];
  const [reports, setReports] = useState(allReports);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleMenuOpen = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleDownload = (index) => {
    alert(`Download do relatório ${index + 1}`);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index) => {
    alert(`Deletar relatório ${index + 1}`);
    setOpenMenuIndex(null);
  };

  const parseDate = (str) => {
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const handleFilter = () => {
    // Se ambos os campos estiverem vazios, retorna todos
    if (!dateFrom && !dateTo) {
      setReports(allReports);
      return;
    }
    setReports(
      allReports.filter((item) => {
        const dateStr = item.split(" - ")[1];
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

  return (
    <>
      {/* CSS para deixar o ícone do calendário branco */}
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
          }
          input[type="date"]::-ms-input-placeholder { color: #fff; }
          input[type="date"]::-webkit-input-placeholder { color: #fff; }
          input[type="date"]::-moz-placeholder { color: #fff; }
          input[type="date"]:-ms-input-placeholder { color: #fff; }
          input[type="date"]::placeholder { color: #fff; }
        `}
      </style>
      <div className="mx-16 my-6 text-white">
        <div className="flex justify-between mb-4">
          {/* Título e instruções */}
          <div className="text-center pl-50 w-[85%] space-y-2 mb-4">
            <div className="flex justify-center">
              <div className="bg-white/10 p-4 rounded-full">
                <CiFileOn size={"70px"} />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Gerar Relatório</h1>
            <p className="text-gray-400 text-sm">
              Você pode gerar um relatório agora ou visualizar os relatórios já
              existentes.
            </p>
          </div>
          <div className="flex">
            <PrimaryButton
              id="generate_report_button_id"
              text="Gerar Relatório"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start items-end gap-4 mb-10">
          <PrimaryButton
            id="filter_report_button_id"
            text="Filtrar"
            onClick={handleFilter}
          />
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
          <button
            id="clear_filter_report_button_id"
            className="flex items-center justify-center cursor-pointer text-pink-zero hover:text-cyan-zero transition text-3xl"
            onClick={handleClearFilters}
            title="Remover Filtros"
            style={{ lineHeight: 0 }}
          >
            <CiEraser size={"40px"} />
          </button>
        </div>
        <div className="max-h-[450px] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Overlay para fechar o menu ao clicar fora */}
            {openMenuIndex !== null && (
              <div
                className="fixed inset-0 z-0"
                onClick={() => setOpenMenuIndex(null)}
                style={{ cursor: "default" }}
              />
            )}
            {reports.map((item, index) => (
              <CardReport
                key={index}
                id={index}
                item={item}
                isMenuOpen={openMenuIndex === index}
                onMenuOpen={() => handleMenuOpen(index)}
                onDownload={() => handleDownload(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;

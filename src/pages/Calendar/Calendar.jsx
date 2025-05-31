import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CalendarMonth from "./components/CalendarMonth";
import SubJobTable from "./components/SubJobTable";
import { getStatusTranslated } from "../../hooks/translateAttributes";

const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]); // [{date: '2024-06-01', subjobs: [...]}, ...]
  const [selectedDate, setSelectedDate] = useState(null);
  const [subJobsForDay, setSubJobsForDay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const navigate = useNavigate();

  // Busca os subjobs do mês selecionado
  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      try {
        // Monta o mês no formato YYYY-MM
        const monthStr = String(currentMonth + 1).padStart(2, "0");
        const yearMonth = `${currentYear}-${monthStr}`;
        // Supondo que a API aceite filtro por mês, senão busque todos e filtre manualmente
        const response = await axiosProvider.get(
          `/sub-jobs?month=${yearMonth}`
        );
        // Agrupa por data
        const grouped = {};
        (response.data || []).forEach((item) => {
          // Filtra manualmente se necessário:
          if (!item.date.startsWith(yearMonth)) return;
          if (!grouped[item.date]) grouped[item.date] = [];
          grouped[item.date].push(item);
        });
        // Transforma em array [{date, subjobs}]
        const arr = Object.entries(grouped).map(([date, subjobs]) => ({
          date,
          subjobs,
        }));
        setCalendarData(arr);
      } catch (err) {
        setCalendarData([]);
      }
      setIsLoading(false);
    };
    fetchCalendarData();
  }, [currentMonth, currentYear]);

  // Função para saber se o dia tem subjob que usa sala e não está concluído
  const hasRoomSubJob = (dateStr) => {
    return calendarData.some(
      (d) =>
        d.date === dateStr &&
        Array.isArray(d.subjobs) &&
        d.subjobs.some((sj) => sj.needsRoom && sj.status !== "CLOSED")
    );
  };

  // Ao clicar em um dia, mostra os subjobs daquele dia (apenas needsRoom e não concluídos)
  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
    const found = calendarData.find((d) => d.date === dateStr);
    setSubJobsForDay(
      found?.subjobs?.filter((sj) => sj.needsRoom && sj.status !== "CLOSED") ||
        []
    );
  };

  // Ao clicar em um subjob, redireciona para o serviço (job) proprietário
  const handleSubJobClick = (subjob) => {
    if (subjob?.fkService) {
      navigate(ROUTERS.getJobDetail(subjob.fkService));
    }
  };

  // Cabeçalho da tabela de subjobs do dia (sem "Valor")
  const tableHeader = [
    { label: "Título", key: "title" },
    { label: "Descrição", key: "description" },
    { label: "Horário Início", key: "startTime" },
    { label: "Horário Fim", key: "expectedEndTime" },
    { label: "Status", key: "status" },
    { label: "Ação", key: "action" },
  ];

  return (
    <div className="slide-in-ltr min-h-screen flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <div className="mx-13 my-3">
        <h1 className="text-2xl font-thin mt-6 mb-4">
          Calendário de Subserviços (Uso de Sala)
        </h1>
        {isLoading ? (
          <SyncLoader
            size={8}
            loading={true}
            color={"#02AEBA"}
            speedMultiplier={2}
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center flex-1">
            <CalendarMonth
              calendarData={calendarData}
              selectedDate={selectedDate}
              onDayClick={handleDayClick}
              month={currentMonth}
              year={currentYear}
              setMonth={setCurrentMonth}
              setYear={setCurrentYear}
              resetSelection={() => {
                setSelectedDate(null);
                setSubJobsForDay([]);
              }}
            />
            <div className="flex-1 min-w-[350px]">
              {selectedDate ? (
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-2">
                    Subserviços em {dayjs(selectedDate).format("DD/MM/YYYY")}
                  </h2>
                  <SubJobTable
                    headers={tableHeader}
                    data={subJobsForDay.map((sj) => ({
                      ...sj,
                      startTime: sj.startTime ? sj.startTime.slice(0, 5) : "",
                      expectedEndTime: sj.expectedEndTime
                        ? sj.expectedEndTime.slice(0, 5)
                        : "",
                      status: getStatusTranslated(sj.status),
                      action: (
                        <PrimaryButton
                          onClick={() => handleSubJobClick(sj)}
                          text="Acessar Serviço"
                        />
                      ),
                    }))}
                    messageNotFound="Nenhum subserviço com uso de sala neste dia"
                  />
                </div>
              ) : (
                <div className="text-gray-400 mt-8">
                  Selecione um dia com subserviço que utiliza sala.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

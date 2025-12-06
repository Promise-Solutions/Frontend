import { useEffect, useState } from "react";
import { axiosProvider } from "../../provider/apiProvider";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CalendarMonth from "./components/CalendarMonth";
import SubJobTable from "./components/SubJobTable";
import TaskTableForDay from "./components/TaskTableForDay";
import { ENDPOINTS } from "../../constants/endpoints";
import { showToast } from "../../components/toastStyle/ToastStyle";

const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]); // [{date: '2024-06-01', subjobs: [...]}, ...]
  const [selectedDate, setSelectedDate] = useState(null);
  const [subJobsForDay, setSubJobsForDay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tasksByDay, setTasksByDay] = useState({});
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const navigate = useNavigate();

  // Busca os subjobs e tarefas do mês selecionado
  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosProvider.get(ENDPOINTS.getAppointmentsByMonth(currentYear, currentMonth));

        const subJobsFound = response.data.subJobs;

        const grouped = {};
        (subJobsFound || []).forEach((item) => {
          if (!item.date) return;
          if (!grouped[item.date]) grouped[item.date] = [];
          grouped[item.date].push(item);
        });
        
        setSubJobsForDay(grouped);

        const arr = Object.entries(grouped).map(([date, subjobs]) => ({
          date,
          subjobs,
        }));
        setCalendarData(arr);

        const tasksFound = response.data.tasks;
        // Agrupa tarefas por data
        const tasksGrouped = {};
        (tasksFound || []).forEach((task) => {
          if (!task.limitDate) return;
          if (!tasksGrouped[task.limitDate]) tasksGrouped[task.limitDate] = [];
          tasksGrouped[task.limitDate].push(task);
        });

        setTasksByDay(tasksGrouped);
      } catch (err) {
        showToast.error("Houve um erro ao buscar os compromissos do mês.");
        setCalendarData([]);
        setTasksByDay({});
      }
      setIsLoading(false);
    };
    fetchCalendarData();
  }, [currentMonth, currentYear]);

  // Ao clicar em um dia, mostra todos os subjobs daquele dia (com e sem uso de sala)
  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  // Cabeçalho da tabela de subjobs do dia (sem "Valor")
  const tableHeader = [
    { label: "Título", key: "title" },
    { label: "Data", key: "date" },
    { label: "Horário Início", key: "startTime" },
    { label: "Horário Fim", key: "expectedEndTime" },
    { label: "Status", key: "status" },
    { label: "Ação", key: "action" },
  ];

  // Ícone de pendência
  const pendingIcon = (
    <span title="Há pendências" className="ml-2 text-yellow-400 align-middle">
      ⚠️
    </span>
  );

  // Calcula compromissos por dia (subserviços ou tarefas)
  const appointmentByDay = {};
  calendarData.forEach(({ date, subjobs }) => {
    if (
      Array.isArray(subjobs)
    ) {
      appointmentByDay[date] = true;
    }
  });
  Object.entries(tasksByDay).forEach(([date, tasks]) => {
    if (
      Array.isArray(tasks)
    ) {
      appointmentByDay[date] = true;
    }
  });

  // Calcula pendencias por dia (subserviços ou tarefas)
  const pendingByDay = {};
  calendarData.forEach(({ date, subjobs }) => {
    if (
      Array.isArray(subjobs) &&
      subjobs.some((sj) => sj.status === "PENDING" || sj.status === "Pendente")
    ) {
      pendingByDay[date] = true;
    }
  });
  Object.entries(tasksByDay).forEach(([date, tasks]) => {
    if (
      Array.isArray(tasks) &&
      tasks.some((t) => t.status === "PENDING" || t.status === "Pendente")
    ) {
      pendingByDay[date] = true;
    }
  });

  // Calcula em Progresso por dia (subserviços ou tarefas)
  const inProgressByDay = {};
  calendarData.forEach(({ date, subjobs }) => {
    if (
      Array.isArray(subjobs) &&
      subjobs.some((sj) => sj.status === "WORKING" || sj.status === "Em progresso")
    ) {
      inProgressByDay[date] = true;
    }
  });
  Object.entries(tasksByDay).forEach(([date, tasks]) => {
    if (
      Array.isArray(tasks) &&
      tasks.some((t) => t.status === "WORKING" || t.status === "Em progresso")
    ) {
      inProgressByDay[date] = true;
    }
  });

  return (
    <div className="slide-in-ltr min-h-screen flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <div className="mx-13 my-3">
        <h1 className="text-2xl font-thin mt-6 mb-4">Calendário</h1>
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
              appointmentByDay={appointmentByDay}
              pendingByDay={pendingByDay}
              inProgressByDay={inProgressByDay}
            />
            <div className="flex-1 min-w-[350px]">
              {selectedDate ? (
                <>
                  <div className="w-full">
                    <p className="text-1xl text-gray-400 font-medium">
                      {dayjs(selectedDate).format("DD/MM/YYYY")}
                    </p>
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                      Subserviços do dia
                      {
                        ( 
                          subJobsForDay[selectedDate]
                          && subJobsForDay[selectedDate].some(s => s.status === "PENDING") 
                        )
                        && pendingIcon}
                    </h2>
                    <SubJobTable
                      headers={tableHeader}
                      data={subJobsForDay[selectedDate] || []}
                      messageNotFound="Nenhum subserviço neste dia"
                    />
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold mb-2 flex items-center">
                        Tarefas do dia
                        {
                          (
                            tasksByDay[selectedDate]
                            && tasksByDay[selectedDate].some(t => t.status === "PENDING")
                          )
                          && pendingIcon}
                      </h2>
                      <PrimaryButton
                        text="Ver todas as tarefas"
                        onClick={() => navigate(ROUTERS.TASKS)}
                      />
                    </div>
                    <TaskTableForDay
                      taskData={tasksByDay[selectedDate] || []}
                    />
                    </div>
                </>
              ) : (
                <div className="text-gray-400 mt-8">
                  Selecione ao lado um dia para visualizar subserviços.
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

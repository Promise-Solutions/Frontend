import { axiosProvider } from "../../../provider/apiProvider";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TaskTable from "./TaskTable";
import { getStatusTranslated } from "../../../hooks/translateAttributes";

// Permite informar ao pai se há tarefas e se há pendentes
const TaskTableForDay = ({ selectedDate, onTasksInfo }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedDate) return;
    setIsLoading(true);
    axiosProvider
      .get(`/tasks`)
      .then((res) => {
        const tasksArr = (res.data || []).filter(
          (task) =>
            (task.limitDate &&
              dayjs(task.limitDate).format("YYYY-MM-DD") === selectedDate) ||
            (task.startDate &&
              dayjs(task.startDate).format("YYYY-MM-DD") === selectedDate)
        );
        setTasks(tasksArr);
        if (onTasksInfo) {
          const hasPending = tasksArr.some(
            (t) => t.status === "PENDING" || t.status === "Pendente"
          );
          onTasksInfo({ hasTasks: tasksArr.length > 0, hasPending });
        }
      })
      .catch(() => {
        setTasks([]);
        if (onTasksInfo) onTasksInfo({ hasTasks: false, hasPending: false });
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, [selectedDate]);

  const tableHeader = [
    { label: "Título", key: "title" },
    { label: "Descrição", key: "description" },
    { label: "Data Limite", key: "limitDate" },
    { label: "Status", key: "status" },
  ];

  const formattedTasks = tasks.map((task) => ({
    ...task,
    limitDate: task.limitDate ? dayjs(task.limitDate).format("DD/MM/YYYY") : "",
    status: getStatusTranslated(task.status),
  }));

  if (isLoading)
    return <span className="text-gray-400">Carregando tarefas...</span>;

  return (
    <TaskTable
      headers={tableHeader}
      data={formattedTasks}
      messageNotFound="Nenhuma tarefa para este dia"
    />
  );
};

export default TaskTableForDay;

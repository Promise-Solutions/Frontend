import dayjs from "dayjs";
import TaskTable from "./TaskTable";
import { getStatusTranslated } from "../../../hooks/translateAttributes";

// Permite informar ao pai se há tarefas e se há pendentes
const TaskTableForDay = ({ taskData }) => {
  const tableHeader = [
    { label: "Título", key: "title" },
    { label: "Descrição", key: "description" },
    { label: "Data Limite", key: "limitDate" },
    { label: "Status", key: "status" },
  ];

  const formattedTasks = taskData.map((task) => ({
    ...task,
    limitDate: task.limitDate ? dayjs(task.limitDate).format("DD/MM/YYYY") : "",
    status: getStatusTranslated(task.status),
  }));

  return (
    <TaskTable
      headers={tableHeader}
      data={formattedTasks}
      messageNotFound="Nenhuma tarefa para este dia"
    />
  );
};

export default TaskTableForDay;

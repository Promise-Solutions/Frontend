// TaskColumn.jsx
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import TaskCard from "./TaskCard";
import ModalEditTask from "../modals/edit/ModalEditTask";

const TaskColumn = ({
  status,
  tasks,
  editTask,
  deleteTask,
  employees,
  onTaskClick,
}) => {
  const [selectedTask, setSelectedTask] = useState(null); // Inicializado antes do useDroppable

  const { setNodeRef, isOver } = useDroppable({
    id: status,
    disabled: !!selectedTask, // Desativa o droppable enquanto o modal estiver aberto
  });

  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col p-4 rounded-md min-h-[300px] transition-colors duration-200 overflow-y-auto max-h-screen relative z-0 ${
        isOver && !selectedTask ? "bg-pink-zero/30" : "bg-white/5"
      }`} // Desativa o efeito visual de hover se o modal estiver aberto
      style={{
        width: "100%",
        height: "100%",
        flexShrink: 0,
      }}
    >
      <div className="space-y-4 relative overflow-visible">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)} // Pass task to parent
            dragDisabled={!!selectedTask} // Desativa o drag enquanto o modal estiver aberto
          />
        ))}
      </div>
      {selectedTask && (
        <ModalEditTask
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(id, updatedTask) => editTask(id, updatedTask)}
          onDelete={deleteTask}
          employees={employees} // Passa a lista de funcionários
        />
      )}
    </div>
  );
};

export default TaskColumn;

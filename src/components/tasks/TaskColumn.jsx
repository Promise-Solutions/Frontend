// TaskColumn.jsx
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, tasks, editTask, deleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 rounded-md min-h-[300px] transition-colors duration-200 overflow-y-auto max-h-[70vh] relative z-0 ${
        isOver ? "bg-pink-zero/30" : "bg-white/5"
      }`}
      style={{ width: "100%" }} // Garante que a coluna ocupe a largura total do contêiner pai
    >
      <div className="space-y-4 relative overflow-visible">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;

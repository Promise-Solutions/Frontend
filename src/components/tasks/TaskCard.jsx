// TaskCard.jsx
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, editTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto", // Aumentar o z-index durante o arraste
    position: isDragging ? "fixed" : "static", // Usar posição fixa para manter o card na frente
    transition: isDragging ? "none" : "transform 0.1s ease", // Reduzir a fluidez do movimento
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white/10 p-3 rounded-md flex justify-between items-center text-white cursor-move shadow-md transition-all duration-200 ${
        isDragging ? "shadow-2xl scale-105" : ""
      }`}
    >
      <input
        className="bg-transparent border-none outline-none text-white w-full mr-2"
        value={task.title}
        onChange={(e) => editTask(task.id, e.target.value)}
      />
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-300 transition text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default TaskCard;

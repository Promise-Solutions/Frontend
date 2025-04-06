import { useDraggable } from "@dnd-kit/core";
import { useState, useRef } from "react";

const TaskCard = ({ task, onClick, dragDisabled }) => {
  const [dragEnabled, setDragEnabled] = useState(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const dragThreshold = 5;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    setActivatorNodeRef,
  } = useDraggable({
    id: task.id,
    disabled: dragDisabled, // Desativa o drag quando dragDisabled for true
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto",
    position: isDragging ? "fixed" : "static",
    transition: isDragging ? "none" : "transform 0.1s ease",
    maxWidth: "100%",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const handlePointerDown = (e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    setDragEnabled(false);

    const handlePointerMove = (moveEvent) => {
      const dx = Math.abs(moveEvent.clientX - pointerStart.current.x);
      const dy = Math.abs(moveEvent.clientY - pointerStart.current.y);
      if (dx > dragThreshold || dy > dragThreshold) {
        setDragEnabled(true);
        document.removeEventListener("pointermove", handlePointerMove);
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener(
      "pointerup",
      () => {
        document.removeEventListener("pointermove", handlePointerMove);
      },
      { once: true }
    );
  };

  const handleClick = () => {
    if (!dragEnabled && !isDragging) {
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-white/10 p-3 rounded-md text-white cursor-pointer shadow-md transition-all duration-200 select-none ${
        isDragging ? "shadow-2xl scale-105" : ""
      }`}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    >
      <div
        ref={setActivatorNodeRef}
        {...(dragEnabled && !dragDisabled ? listeners : {})} // Desativa listeners se dragDisabled for true
        className="w-full h-full select-none"
      >
        <p className="break-words whitespace-pre-wrap w-full">
          <span className="text-sm font-bold text-cyan-zero">Título: </span>
          {task.title}
        </p>
        <p className="break-words whitespace-pre-wrap w-full">
          <span className="text-sm font-bold text-cyan-zero">Descrição: </span>
          {task.description}
        </p>
        <p className="text-xs">
          <span className="text-sm font-bold text-cyan-zero">
            Data de Início:
          </span>{" "}
          {new Date(task.start_date).toLocaleDateString()}
        </p>
        {task.deadline && (
          <p className="text-xs">
            <span className="text-sm font-bold text-cyan-zero">
              Data Limite:
            </span>{" "}
            {new Date(task.deadline).toLocaleDateString()}
          </p>
        )}
        <p className="text-xs">
          <span className="text-sm font-bold text-cyan-zero">Responsável:</span>{" "}
          {task.responsibleName || "Não atribuído"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;

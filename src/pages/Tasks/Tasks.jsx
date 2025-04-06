// Tasks.jsx
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import TaskColumn from "../../components/tasks/TaskColumn";

const statuses = ["pendente", "fazendo", "concluido"];

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Estudar DnD Kit", status: "pendente" },
    { id: "2", title: "Fazer deploy", status: "fazendo" },
    { id: "3", title: "Beber água", status: "concluido" },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: "pendente",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white p-10">
      <div className="w-full max-w-[1200px] flex flex-col space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="Nova tarefa"
              className="bg-white/5 border border-pink-zero text-white px-4 py-2 rounded-md w-[250px] focus:outline-none"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button
              onClick={addTask}
              className="border border-pink-zero text-pink-zero px-4 py-2 rounded-md hover:bg-pink-zero hover:text-white transition"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Colunas */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-6">
              {statuses.map((status) => (
                <div key={status} className="flex-1 flex flex-col items-center">
                  <h2 className="text-xl font-bold text-white mb-4 text-center bg-white/10 px-4 py-2 rounded-md w-full">
                    {status === "pendente"
                      ? "📌 Pendente"
                      : status === "fazendo"
                      ? "⚙️ Fazendo"
                      : "✅ Concluído"}
                  </h2>
                  <TaskColumn
                    status={status}
                    tasks={tasks}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                </div>
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default Tasks;

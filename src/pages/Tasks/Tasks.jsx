// Tasks.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import TaskColumn from "../../components/tasks/TaskColumn";
import ModalAddTask from "../../components/modalAddTask/ModalAddTask";
import ModalEditTask from "../../components/modalEditTask/ModalEditTask";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";

const statuses = ["pendente", "fazendo", "concluido"];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasksAndEmployees = async () => {
      try {
        const [tasksResponse, employeesResponse] = await Promise.all([
          axios.get("http://localhost:5000/tasks"),
          axios.get("http://localhost:5000/funcionarios"),
        ]);

        const employeesMap = employeesResponse.data.reduce((map, emp) => {
          map[emp.id] = emp.nome;
          return map;
        }, {});

        const tasksWithNames = tasksResponse.data.map((task) => ({
          ...task,
          responsibleName: employeesMap[task.responsible] || "Não atribuído",
        }));

        setTasks(tasksWithNames);
        setEmployees(employeesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasksAndEmployees();
  }, []);

  const handleAddTask = (newTask) => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((res) => {
        setTasks([...tasks, res.data]);
        setIsAddModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    axios
      .patch(`http://localhost:5000/tasks/${taskId}`, { status: newStatus })
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white overflow-x-hidden mx-16 py-4">
      {!isAddModalOpen && !isEditModalOpen ? (
        <>
          <div className="flex justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-thin mt-4">Tarefas</h1>
            <PrimaryButton
              className="border border-pink-zero text-pink-zero px-4 py-2 rounded-md hover:bg-pink-zero hover:text-white transition"
              onClick={() => setIsAddModalOpen(true)}
              text="Adicionar Tarefa"
            />
          </div>

          <div className="w-full flex flex-col items-center space-y-10">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="w-full overflow-auto">
                <div className="flex gap-6 justify-center items-start min-w-[1000px] mx-auto">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className="flex flex-col items-center w-[320px]"
                    >
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
                        employees={employees}
                        editTask={(id, updatedTask) => {
                          axios
                            .patch(
                              `http://localhost:5000/tasks/${id}`,
                              updatedTask
                            )
                            .then(() => {
                              setTasks((prev) =>
                                prev.map((t) =>
                                  t.id === id ? { ...t, ...updatedTask } : t
                                )
                              );
                              setIsEditModalOpen(false);
                            })
                            .catch((err) => console.error(err));
                        }}
                        deleteTask={(id) => {
                          axios
                            .delete(`http://localhost:5000/tasks/${id}`)
                            .then(() =>
                              setTasks((prev) =>
                                prev.filter((t) => t.id !== id)
                              )
                            )
                            .catch((err) => console.error(err));
                        }}
                        onTaskClick={(task) => {
                          setSelectedTask(task);
                          setIsEditModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </DndContext>
          </div>
        </>
      ) : isAddModalOpen ? (
        <ModalAddTask
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTask={handleAddTask}
          employees={employees}
        />
      ) : (
        <ModalEditTask
          task={selectedTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={(id, updatedTask) => {
            axios
              .patch(`http://localhost:5000/tasks/${id}`, updatedTask)
              .then(() => {
                setTasks((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t))
                );
              })
              .catch((err) => console.error(err));
          }}
          onDelete={(id) => {
            axios
              .delete(`http://localhost:5000/tasks/${id}`)
              .then(() => setTasks((prev) => prev.filter((t) => t.id !== id)))
              .catch((err) => console.error(err));
          }}
          employees={employees}
        />
      )}
    </div>
  );
};

export default Tasks;

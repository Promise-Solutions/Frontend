// Tasks.jsx
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import TaskColumn from "../../components/tasks/TaskColumn";
import ModalAddTask from "../../components/modals/modalAddTask/ModalAddTask";
import ModalEditTask from "../../components/modals/modalEditTask/ModalEditTask";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import { axiosProvider } from "../../provider/apiProvider";
import { SyncLoader } from "react-spinners";
import { ENDPOINTS } from "../../constants/endpoints";

const statuses = ["Pendente", "Fazendo", "Concluído"];

const mapStatusToBackend = {
  Pendente: "PENDING",
  Fazendo: "WORKING",
  Concluído: "COMPLETED",
};

const mapStatusToFrontend = {
  PENDING: "Pendente",
  WORKING: "Fazendo",
  COMPLETED: "Concluído",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasksAndEmployees = async () => {
      try {
        const [tasksResponse, employeesResponse] = await Promise.all([
          axiosProvider.get(ENDPOINTS.TASKS),
          axiosProvider.get(ENDPOINTS.EMPLOYEES),
        ]);

        if (
          !tasksResponse.data ||
          !Array.isArray(tasksResponse.data) ||
          !employeesResponse.data ||
          !Array.isArray(employeesResponse.data)
        ) {
          console.error("Invalid API response structure", {
            tasksResponse: tasksResponse.data,
            employeesResponse: employeesResponse.data,
          });
          throw new Error("Invalid API response structure");
        }

        const employeesMap = employeesResponse.data.reduce((map, emp) => {
          map[emp.id] = emp.name;
          return map;
        }, {});

        const tasksWithNames = tasksResponse.data.map((task) => ({
          ...task,
          status: mapStatusToFrontend[task.status] || task.status,
          responsibleName: employeesMap[task.fkEmployee] || "Não atribuído",
        }));

        setTasks(tasksWithNames);
        setEmployees(employeesResponse.data);
      } catch (err) {
        console.error("Failed to fetch tasks or employees:", err);
        setTasks([]); // Set default empty array to prevent breaking
        setEmployees([]); // Set default empty array to prevent breaking
      }
    };

    fetchTasksAndEmployees();

    setIsLoading(false);
    return () => {
      // Cleanup logic if needed in the future
    };
  }, []);

  const handleAddTask = (newTask) => {
    const { fkEmployee, limitDate, ...rest } = newTask;

    const payload = {
      ...rest,
      fkEmployee: fkEmployee || null, // Send null if no responsible is selected
      limitDate: limitDate || null, // Send null if no limit date is selected
      status: "PENDING", // Always send status as PENDING
    };
    console.log("Payload for adding task:", payload); // Log the payload
    axiosProvider
      .post(ENDPOINTS.TASKS, payload)
      .then((res) => {
        const taskWithNames = {
          ...res.data,
          status: mapStatusToFrontend[res.data.status],
          responsibleName:
            employees.find((emp) => emp.id === res.data.fkEmployee)?.name ||
            "Não atribuído",
        };
        setTasks([...tasks, taskWithNames]);
        setIsAddModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleEditTask = (id, updatedTask) => {
    const { fkEmployee, limitDate, status, startDate, ...rest } = updatedTask;

    const payload = {
      id, // Adiciona o campo id explicitamente
      ...rest,
      fkEmployee: fkEmployee || null, // Certifica-se de enviar fkEmployee corretamente
      limitDate: limitDate || null, // Envia null se limitDate estiver vazio
      startDate,
      status: mapStatusToBackend[status],
    };

    axiosProvider
      .patch(ENDPOINTS.getTaskById(id), payload)
      .then((res) => {
        const updatedTaskWithNames = {
          ...res.data,
          status: mapStatusToFrontend[res.data.status],
          responsibleName:
            employees.find((emp) => emp.id === res.data.fkEmployee)?.name ||
            "Não atribuído", // Atualiza o campo responsibleName
        };

        setTasks((prev) =>
          prev.map((t) => (t.id === id ? updatedTaskWithNames : t))
        );
        setIsEditModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = mapStatusToBackend[over.id];

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const { responsibleName, ...payload } = {
      ...task,
      fkEmployee: task.fkEmployee || null, // Certifica-se de enviar fkEmployee corretamente
      status: newStatus, // Atualiza o status
    }; // Remove o campo responsibleName do payload

    axiosProvider
      .patch(`tasks/${taskId}`, payload)
      .then(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? { ...t, status: mapStatusToFrontend[newStatus] }
              : t
          )
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="slide-in-ltr flex flex-col items-center text-white overflow-x-hidden mx-16 my-6">
      {!isAddModalOpen && !isEditModalOpen ? (
        <>
          <div className="flex justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-thin">Gerencie suas tarefas</h1>
            <PrimaryButton
              onClick={() => setIsAddModalOpen(true)}
              text="Adicionar Tarefa"
            />
          </div>

          {isLoading ? (
            <SyncLoader
              size={8}
              loading={true}
              color={"#02AEBA"}
              speedMultiplier={2}
            />
          ) : (
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
                          {status === "Pendente"
                            ? "📌 Pendente"
                            : status === "Fazendo"
                            ? "⚙️ Fazendo"
                            : "✅ Concluído"}
                        </h2>
                        <TaskColumn
                          status={status}
                          tasks={tasks}
                          employees={employees}
                          editTask={handleEditTask}
                          deleteTask={(id) => {
                            axiosProvider
                              .delete(`tasks/${id}`)
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
          )}
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
          onEdit={handleEditTask}
          onDelete={(id) => {
            axiosProvider
              .delete(`tasks/${id}`)
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

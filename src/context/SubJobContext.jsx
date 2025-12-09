import { createContext, useContext } from "react";
import { axiosProvider } from "../provider/apiProvider";
import { showToast } from "../components/toastStyle/ToastStyle.jsx";
import { ENDPOINTS } from "../constants/endpoints";

const SubJobContext = createContext({});

export function SubJobProvider({ children }) {
  const saveSubJob = async (formData) => {
    try {
      const request = await axiosProvider.post(ENDPOINTS.SUBJOBS, formData);

      showToast.success("Subservico Cadastrado!");
      return request.status;
    } catch (error) {
      console.error("Erro ao cadastrar subserviço", error);
      if (error && error.response.status == 409) {
        showToast.error(
          "Horários em conflito com outro subserviço registrado."
        );
      } else {
        showToast.error("Não foi possível cadastrar o subserviço");
      }
    }
  };

  const updateSubJobStatus = async (id, data) => {
    if (!id) return;

    try {
      const response = await axiosProvider.patch(
        ENDPOINTS.updateSubJobStatus(id),
        data
      );

      if (response.status == 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao atualizar o status do subserviço", error);
      showToast.error("Não foi possível atualizar o status do subserviço");
      return null;
    }
  };

  const findSubJobsByJobId = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axiosProvider.get(ENDPOINTS.getSubJobByJob(jobId));
      const subJobData = response.data;
      return subJobData;
    } catch (error) {
      console.error("Erro ao buscar subserviços:", error);
      return [];
    }
  };

  const updateSubJobData = async (subJobData) => {
    if (subJobData == null) return;
    const id = subJobData.id;

    try {
      const request = await axiosProvider.patch(ENDPOINTS.getSubJobById(id), {
        title: subJobData.title,
        description: subJobData.description,
        value: subJobData.value,
        date: subJobData.date,
        needsRoom: subJobData.needsRoom,
        startTime: subJobData.startTime,
        expectedEndTime: subJobData.expectedEndTime,
        status: subJobData.status,
        fkService: subJobData.fkService,
      });

      if (request.status === 200) {
        showToast.success("Subserviço atualizado com sucesso!");
        return request.data;
      }
    } catch (error) {
      if (error && error.response.status == 409) {
        showToast.error(
          "Horários em conflito com outro subserviço registrado."
        );
      } else {
        showToast.error("Erro ao atualizar o subserviço");
        console.error("Erro ao atualizar o subserviço", error);
      }
    }
  };

  const deleteSubJobById = async (subJobId) => {
    if (!subJobId) return;

    try {
      const request = await axiosProvider.delete(
        ENDPOINTS.getSubJobById(subJobId)
      );

      showToast.success("Subserviço excluído com sucesso!");
      return request.data;
    } catch (error) {
      console.error("Erro ao excluir o subserviço", error);
      showToast.error("Erro ao excluir subserviço");
    }
  };

  return (
    <SubJobContext.Provider
      value={{
        findSubJobsByJobId,
        updateSubJobStatus,
        updateSubJobData,
        deleteSubJobById,
        saveSubJob,
      }}
    >
      {children}
    </SubJobContext.Provider>
  );
}

export const useSubJobContext = () => useContext(SubJobContext);

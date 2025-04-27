import React, { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { axiosProvider } from "../provider/apiProvider";
import { showToast, ToastStyle } from "../components/toastStyle/ToastStyle";

const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null);

  const saveJob = async (formData) => {
    try {
      const request = await axiosProvider.post(`/jobs`, formData);

      if (request.status == 201) {
        showToast.success("Servico Cadastrado!", { style: ToastStyle })
      } 
    } catch (error) {
      showToast.error("Erro ao cadastrar servico!");
      console.error("Erro ao cadastrar servico!", error);
    }
  };

  const fetchJobData = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axiosProvider.get(`/jobs/${jobId}`)
      const jobData = response.data || null;

      if (jobData) {
        setJob({
          ...jobData,
          categoria:
            jobData.category === "MUSIC_REHEARSAL"
              ? "Ensaio Musical"
              : jobData.category === "PHOTO_VIDEO_STUDIO"
              ? "Estúdio Fotográfico"
              : "Podcast",
          tipoServico: jobData.serviceType === "SINGLE" ? "Avulso" : "Mensal",
          status: 
            jobData.status === "PENDING" 
              ? "Pendente"
              : jobData.status === "COMPLETED"
              ? "Concluído"
              : "Cancelado"
        });

        return jobData;
      } else {
        throw new Error("Serviço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do serviço:", error);
    }
  };

  const findJobs = async () => {
    try {
      const response = await axiosProvider.get("/jobs");
      const jobs = response.data;
      console.log("jobs", jobs)
      return jobs;
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
    }
  };

  const findJobsByClientId = async (clientId) => {
    try {
      const response = await axiosProvider.get(`/jobs/client?fkClient=${clientId}`);

      if(response.status == 200) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
    }
  };

  const updateStatusJob = async (idServico) => {
    try {

      const response = await axiosProvider.get(
        `/subservicos?fkServico=${idServico}`
      );

      const verifyAllDone = response.data.every((subJob) => subJob.concluido);
      const request = await axiosProvider.patch(`/jobs/${idServico}`, {
        concluido: verifyAllDone,
      });

      if (request.status === 200) {
        console.log("Status atualizado com sucesso");
      }
    } catch (error) {
      showToast.error("Erro ao atualizar o status do serviço:");
      console.error("Erro ao atualizar o status do serviço:", error);
    }
  };

  const updateJobData = async (id, jobData) => {
    if (!id) return;
    try { 
      const response = await axiosProvider.patch(`/jobs/${id}`, {
        title: jobData.title,
        category: jobData.category,
        totalValue: jobData.totalValue,
        fkClient: jobData.fkClient,
        status: jobData.status,
        serviceType: jobData.serviceType
      });

      if (response.status === 200) {
        console.log("Serviço atualizado com sucesso!");
        showToast.success("Serviço atualizado com sucesso!");
        return response.data
      }
    } catch (error) {
      showToast.error("Erro ao atualizar o serviço");
      console.error("Erro ao atualizar o serviço", error);
    }
  };

  const deleteJobById = async (id) => {
    if (!id) return;
    try {
      const request = await axiosProvider.delete(`/jobs/${id}`);
      if (request.status) {
        showToast.success("Serviço excluído com sucesso");
      }
      return request.status;
    } catch (error) {
      if(error.response && error.response.status == 409) {
        console.log("Erro! Não é possível excluir um serviço com subserviços associados");
        showToast.error("Ainda há subserviços existentes associados");

      } else {
        showToast.error("Erro ao excluir serviço");
        console.error("Erro ao excluir serviço", error);
      }
    }
  }

  return (
    <JobContext.Provider
      value={{
        job,
        setJob,
        findJobs,
        updateStatusJob,
        fetchJobData,
        updateJobData,
        deleteJobById,
        saveJob,
        findJobsByClientId
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);

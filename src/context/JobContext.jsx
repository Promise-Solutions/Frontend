import React, { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { axiosProvider } from "../provider/apiProvider";

const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null)

  const saveJob = async (formData) => {
    try {
      const request = await axiosProvider.post(`/jobs`, formData)

      if (request.status == 201) {
        toast.success("Servico Cadastrado!")
      }
    } catch(error) {
        toast.error("Erro ao cadastrar servico!")
        console.error("Erro ao cadastrar servico!", error)
    }
  }

  const fetchJobData = async (jobId) => {
    if (!jobId) return;

    console.log("jobId" + jobId)

    try {
      const response = await axiosProvider.get(`/jobs?id=${jobId}`)
      const jobData = response.data[0] || null;

      console.log("jobData", jobData)

      if (jobData) {
        setJob(jobData);
        return jobData;
      } else {
        throw new Error("serviço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do serviço:", error);
    }
  };


  const findJobs = async () => {
    try {
      const response = await axiosProvider.get("/jobs");
      const jobs = response.data;
      console.log(jobs)
      return jobs;
    } catch (error) {
      console.error("Erro ao buscar servicos:", error);
      return [];
    }  
  }

  const updateStatusJob = async (idServico) => {
    try {
        console.log(idServico)

        const response = await axiosProvider.get(`/subservicos?fkServico=${idServico}`);

        const verifyAllDone = response.data.every(subJob => subJob.concluido);
        const request = await axiosProvider.patch(`/jobs/${idServico}`, {concluido: verifyAllDone})

        if (request.status === 200) {
            console.log("Status atualizado com sucesso")
        }
    } catch(error) {
        toast.error("Erro ao atualizar o status do serviço:");
        console.error("Erro ao atualizar o status do serviço:", error);
    }
  }

  const updateJobData = async (id, jobData) => {
    if(!id) return;

    try {
        const request = await axiosProvider.patch(`/jobs/${id}`, 
                        { titulo: jobData.title, categoria:jobData.category, tipoServico: jobData.jobType})
                
        if(request.status === 200) {
            console.log("Serviço atualizado com sucesso!")
        }
    } catch(error) {
        toast.error("Erro ao atualizar o serviço")
        console.error("Erro ao atualizar o serviço", error)
    }
  }

  const deleteJobById = async (id) => {
    if(!id) return;
    try {
      const request = await axiosProvider.delete(`/jobs/${id}`)
      toast.success("Serviço excluído com sucesso");
      
      return request.status
    } catch(error) {
      toast.error("Erro ao excluir serviço") 
      console.error("Erro ao excluir serviço", error)
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
        saveJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);

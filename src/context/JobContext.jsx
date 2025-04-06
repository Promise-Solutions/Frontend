import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null)

  const fetchJobData = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axios.get(`http://localhost:5000/servicos?id=${jobId}`);
      const jobData = response.data[0] || null;

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
      const response = await axios.get("http://localhost:5000/servicos");
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
        const response = await axios.get(`http://localhost:5000/subservicos?idServico=${idServico}`);

        const verifyAllDone = response.data.every(subJob => subJob.concluido);
        const request = await axios.patch(`http://localhost:5000/servicos/${idServico}`, {concluido: verifyAllDone})
        console.log("updateStatus")
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
        const request = await axios.patch(`http://localhost:5000/servicos/${id}`, 
                        { titulo: jobData.title, categoria:jobData.category, data: jobData.date, horario: jobData.time})
                
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
      const request = await axios.delete(`http://localhost:5000/servicos/${id}`)
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
        deleteJobById
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);

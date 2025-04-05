import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null);
  const [jobId, setJobId] = useState(null);

  const fetchJobData = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axios.get(`http://localhost:5000/servicos?id=${jobId}`);
      const jobData = response.data[0] || null;

      if (jobData) {
        setJob(jobData);
        setJobId(jobData.id);
        return jobData;
      } else {
        throw new Error("Atendimento não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do atendimento:", error);
    }
  };



  // Função declarada
  async function findJobs() {
    try {
      const response = await axios.get("http://localhost:5000/servicos");
      const jobs = response.data;
      console.log(jobs)
      return jobs;
    } catch (error) {
      console.error("Erro ao buscar servicos:", error);
      return [];
    } finally {
    }
  }

  async function updateStatus(id, isDone) {

    try {
        const request = await axios.patch(`http://localhost:5000/servicos/${id}`, { concluido: isDone });
        console.log("updateStatus")
        if (request.status === 200) {
            console.log("Status atualizado com sucesso")
          }
    } catch(error) {
        console.error("Erro ao atualizar o status do atendimento:", error);
    } finally {
    }
  }

  return (
    <JobContext.Provider
      value={{
        job,
        setJob,
        findJobs,
        updateStatus,
        fetchJobData
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);

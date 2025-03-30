import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null);

  // Função declarada
  async function findJobs() {
    try {
      const response = await axios.get("http://localhost:5000/atendimentos");
      const jobs = response.data;
      console.log(jobs)
      return jobs;
    } catch (error) {
      console.error("Erro ao buscar atendimentos:", error);
      return [];
    } finally {
    }
  }

  async function updateStatus(id, isDone) {

    try {
        const response = await axios.patch(`http://localhost:5000/atendimentos/${id}`, { concluido: isDone });
        console.log("updateStatus")
        if (response.status === 200) {
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
        findJobs, // Exporta a função
        updateStatus // Exporta a função
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);

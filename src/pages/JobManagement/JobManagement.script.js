import React from "react"
import CardSubJob from "../../components/CardSubJob/CardSubJob"
import ModalEditSubJob from "../../components/ModalEditSubJob/ModalEditSubJob";
import toast from "react-hot-toast";

export const handleInputChange = (e, setJobData) => {
  const { name, value } = e.target;
  setJobData(prev => ({ ...prev, [name]: value }));
}

export const renderSubJobs = async (findSubJobsByJobId) => {
  const subJobsFound = await findSubJobsByJobId(sessionStorage.getItem("jobId"))
  console.log("subserviços encontrados: ", subJobsFound)
  const cardsSubJob = subJobsFound.map((subJob) => {
    console.log("Renderizando subserviços:", {
        title: subJob.titulo,
        description: subJob.descricao
      });
      
      return React.createElement((CardSubJob), {
        key: subJob.id,
        id: subJob.id,
        title: subJob.titulo,
        description: subJob.descricao,
        quantity: subJob.quantidade,
        value: subJob.valor,
        date: subJob.data,
        timeDone: subJob.horarioConclusao,
        isDone: subJob.concluido,
      })
      
    })
    return cardsSubJob;
  }

export const saveChanges = async (updateJobData, job) => {
    const jobId = job.id
    const jobData = {
      title: job.titulo,
      category: job.categoria,
      date: job.data,
      time: job.horario
    }
    
    await updateJobData(jobId, jobData)
  }
  
  export const deleteJob = async (deleteJobById, id, navigate) => {
    const status = await deleteJobById(id)
        
    navigate("/jobs");
}
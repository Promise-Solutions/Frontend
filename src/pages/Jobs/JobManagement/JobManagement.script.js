import React from "react"
import ModalEditSubJob from "../../../components/modals/modalEditSubJob/ModalEditSubJob"
import toast from "react-hot-toast";
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";
import CardSubJob from '../../../components/cards/cardSubJob/CardSubJob'

export const handleInputChange = (e, setJobData) => {
  const { name, value } = e.target;
  setJobData(prev => ({ ...prev, [name]: value }));
}


export const editSubJobsInfos = async (subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob) => {
    if(isEditingSubJob) {
        const modalEditSubJob = React.createElement(ModalEditSubJob, { subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob })

        return modalEditSubJob;
    } 
}


export const renderSubJobs = async (findSubJobsByJobId, setModalEditSubJob, isEditingSubJob, setIsEditingSubJob, setSubJobIdToEdit, setSubJobDataToEdit) => {
  const subJobsFound = await findSubJobsByJobId(sessionStorage.getItem("jobId"))
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
        expectedDate: subJob.dataPrevista,
        timeDone: subJob.horarioConclusao,
        isDone: subJob.concluido,    
        setModalEditSubJob,    
        isEditingSubJob, 
        setIsEditingSubJob,
        setSubJobIdToEdit,
        setSubJobDataToEdit
      })
      
    })
    return cardsSubJob;
  }

  export const registerRedirect = (navigate) => {
    navigate("/register/subjobs")
  }

export const saveChanges = async (updateJobData, job) => {
    if(job.id == null || job.titulo == "" || job.categoria == "" || job.tipoServico == "") {
      toast.error("Campos vazios não são aceitos!", { style: ToastStyle })
      return;
    } 
      const jobId = job.id
      const jobData = {
        title: job.titulo,
        category: job.categoria,
        jobType: job.tipoServico,
      }
      
      await updateJobData(jobId, jobData)
    
  }
  
  export const deleteJob = async (deleteJobById, id, navigate) => {
    await deleteJobById(id)
        
    navigate("/jobs");
}
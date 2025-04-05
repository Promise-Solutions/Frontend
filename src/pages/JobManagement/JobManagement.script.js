import React from "react"
import CardSubJob from "../../components/CardSubJob/CardSubJob"
import ModalEditSubJob from "../../components/ModalEditSubJob/ModalEditSubJob";



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
          // setModalEditSub
      })
      
    })
    return cardsSubJob;
}
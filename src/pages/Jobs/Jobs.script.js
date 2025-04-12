import React from "react";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton.jsx";

export const registerRedirect = (navigate) => {
  navigate("/register/jobs");
};

export const renderJobs = async (
  findJobs,
  navigate,
  findClientById
) => {
  const jobs = await findJobs();

  const jobsReturned = await Promise.all(
    jobs.map( async (job) => {
    console.log("Buscando serviços:", {
      title: job.titulo,
      category: job.categoria
    });

      const client = await findClientById(job.fkCliente);
      return {
        key: job.id,
        id: job.id,
        title: job.titulo,
        category: job.categoria,
        jobType: job.tipoServico, 
        client: client?.nome != undefined ? client.nome : "Desconhecido",
        isDone: job.concluido ? "Concluído": "Pendente",
        action: React.createElement(PrimaryButton, {
          id: "access_button",
          text: "Acessar",
          onClick: (() => {
            navigate(`/jobs/${job.id}`)
            sessionStorage.setItem("jobId", job.id)
          }) 
        })
    }}),
  )
  return jobsReturned;
}
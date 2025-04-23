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

      const client = await findClientById(job.fkClient);
      return {
        key: job.id,
        id: job.id,
        title: job.title,
        category: job.category,
        jobType: job.serviceType, 
        client: client?.name != undefined ? client.name : "Desconhecido",
        status: job.status,
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
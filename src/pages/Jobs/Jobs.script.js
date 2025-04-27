import React from "react";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton.jsx";
import { getCategoryTranslated, getServiceTypeTranslated, getStatusTranslated } from "../../hooks/translateAttributes.js";

export const registerRedirect = (navigate) => {
  navigate("/register/jobs");
};

export const renderJobs = async (
  findJobs,
  navigate,
  findClientById
) => {
  const jobs = await findJobs();
  console.log("jobs", jobs)

  if (jobs != []) {
    const jobsReturned =  await Promise.all(
      jobs.map( async (job) => {
      console.log("Buscando serviços:", {
        title: job.title,
        category: job.category
      });
  
        const client = await findClientById(job.fkClient);
  
        return {
          key: job.id,
          id: job.id,
          title: job.title,
          category: getCategoryTranslated(job.category),
          serviceType: getServiceTypeTranslated(job.serviceType), 
          client: client?.name != undefined ? client.name : "Desconhecido",
          totalValue: job.totalValue,
          status: getStatusTranslated(job.status),
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
  return [];
}
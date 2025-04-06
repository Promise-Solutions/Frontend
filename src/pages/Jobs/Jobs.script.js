import React from "react";
import CardJobs from "../../components/CardJob/CardJob.jsx";

export const registerRedirect = () => {
  window.location.href = "/jobs/register";
};

export const renderJobs = async (
  findJobs,
  navigate
) => {
  const jobs = await findJobs();

  return jobs.map((job) => {
    console.log("Renderizando atendimentos:", {
      title: job.titulo,
      category: job.categoria
    });

    return React.createElement(CardJobs, {
      key: job.id,
      id: job.id,
      title: job.titulo,
      category: job.categoria,
      date: job.data, 
      time: job.horario,
      isDone: job.concluido,
      userId: job.idCliente,
      onClick: () => {
          sessionStorage.setItem("jobId", job.id);
          navigate(`/jobs/${job.id}`); // redireciona sem recarregar a página
      },
    });
  });
};

import React from "react";
import CardJobs from "../../components/cardJob/CardJob.jsx";

export const registerRedirect = () => {
  window.location.href = "/jobs/register";
};

/**
 * @descrição Comentado pois foi transformado em uma função dentro do contexto
 */


export const renderJobs = async (
  findJobs,
  navigate
) => {
  const jobs = await findJobs();

  return jobs.map((job) => {
    console.log("Renderizando atendimentos:", {
      title: job.titulo,
      category: job.categoria,
    });

    return React.createElement(CardJobs, {
      key: job.id,
      id: job.id,
      title: job.titulo,
      category: job.categoria,
      time: job.horario,
      isDone: job.concluido,
      onClick: () => {
          navigate(`/jobs/${job.id}`); // redireciona sem recarregar a página
      },
    });
  });
};

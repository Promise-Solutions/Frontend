import React from "react";
import CardJobs from "../../components/CardJob/CardJob.jsx";
import { useNavigate } from "react-router-dom"; 

export const registerRedirect = (navigate) => {
  navigate("/register/jobs");
};

export const renderJobs = async (
  findJobs,
  navigate
) => {
  const jobs = await findJobs();

  return jobs.map((job) => {
    console.log("Renderizando serviços:", {
      title: job.titulo,
      category: job.categoria
    });

    console.log(job.dataRegistro)

    return React.createElement(CardJobs, {
      key: job.id,
      id: job.id,
      title: job.titulo,
      category: job.categoria,
      date: job.dataRegistro, 
      time: job.horario,
      isDone: job.concluido,
      clientId: job.fkCliente,
      onClick: () => {
          localStorage.setItem("jobId", job.id);
          navigate(`/jobs/${job.id}`); // redireciona sem recarregar a página
      },
    });
  });
};

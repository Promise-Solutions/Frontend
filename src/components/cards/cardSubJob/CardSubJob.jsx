import React, { useState, useEffect } from "react";
import ImageDone from "../../../assets/icone-concluido.png";
import { useSubJobContext } from "../../../context/SubJobContext";
import { useJobContext } from "../../../context/JobContext";
import { editSubJobsInfos } from "./CardSubJob.script";

const CardSubJob = React.memo((
        { id, title, description, quantity, value, expectedDate, 
        timeDone, isDone, setModalEditSubJob, isEditingSubJob, setIsEditingSubJob, setSubJobIdToEdit, setSubJobDataToEdit }) => {
  const [done, setDone] = useState(isDone);
  const [timeDoneText, setTimeDoneText] = useState(timeDone);
  const { currentDate, updateStatus } = useSubJobContext()
  const { job, updateStatusJob } = useJobContext();

  const handleChangeStatus = async () => {
    setDone(!done);

    // // Atualiza o status no backend
    await updateStatus(id, !done);
    setTimeDoneText(currentDate)
    await updateStatusJob(job.id)
  };

  const handleIsEditingStatus =  () => {
    const [dia, mes, ano] = expectedDate.split("/");

    const subJobData = {
      id,
      title,
      description,
      quantity,
      value: value.toFixed(2).replace(".", ","),
      expectedDate: `${ano}-${mes}-${dia}`
    }

    setSubJobIdToEdit(id)
    setSubJobDataToEdit(subJobData)
    setIsEditingSubJob(true)
  }

  return (
    <div
      id={`job_${id}`}
      className={`card_subjob relative overflow-visible flex flex-col justify-center border-1 pl-3 text-[#d9d9d9] max-h-[18rem] h-auto min-h-[12rem] w-auto px-3 max-w-[27rem] min-w-[20rem] rounded-[3px] duration-100 bg-[#040404AA] ${
        done ? "border-cyan-zero" : "border-pink-zero"
      }`}
    >
      <div className="flex py-2 text-2xl font-bold items-center gap-[4px]">
        <h1 className="card_subjob_title">{title}</h1>
      </div>
      <div>
        <ul
          className={`py-1 text-[14px] list-none
                ${
                  done ? "marker:text-pink-zero" : "marker:text-cyan-zero"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Descrição: </b> <span className="block max-h-[3rem] overflow-y-auto break-words breakable-text"> {description} </span>
          </li>
          <li>
            <b>Quantidade: </b> <span className="breakable-text"> {quantity} </span>
          </li>
          <li>
            <b>Valor: </b> <span className="breakable-text overflow-y-auto max-h-[3rem]"> R$ {value.toFixed(2).replace(".", ",")} </span>
          </li>
          <li>
            <b>Data Prevista: </b> <span className="breakable-text overflow-y-auto max-h-[3rem]"> {expectedDate} </span>
          </li>
          <li>
            <b>Status: </b> <b className={`${done ? "text-cyan-zero":"text-yellow-zero"}`}>{done ? "Concluído" : "Pendente"}</b>
          </li>
          <li>
            <b>Horário de conclusão: </b> {done ? timeDoneText : "Não concluído"}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 py-2 mb-1 border-t-[#ccc] items-center">
        <div className="flex justify-between w-[70%] max-w-[15rem] gap-2">
            <button
              onClick={handleChangeStatus}
              className={`h-[34px] w-[7rem] text-[14px] border-2 hover:text-[#B9B9B9]
                ${done ? "text-pink-zero border-pink-zero " : "text-cyan-zero border-cyan-zero"} 
                font-bold cursor-pointer duration-100 ease-in-out`}
            >
              {done ? "Desmarcar": "Concluir"}
            </button>
            <button
              onClick={() => handleIsEditingStatus() }
              className={`h-[34px] w-[7rem] text-[14px] text-yellow-zero hover:text-[#B9B9B9]
                border-2 border-yellow-zero
                font-bold cursor-pointer duration-100`}
                >
              Editar
            </button>
          </div>
          
          <img
            src={ImageDone}
            className={`h-8 ml-4 duration-100 mr-2 ${
              done ? "opacity-100" : "opacity-0"
            }`}
          />
      </div>
    </div>
  );
});

export default CardSubJob;

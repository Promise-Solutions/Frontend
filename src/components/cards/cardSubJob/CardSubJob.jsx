import React, { useEffect, useState } from "react";
import ImageDone from "../../../assets/icone-concluido.png";
import { useSubJobContext } from "../../../context/SubJobContext";
import { showToast } from "../../toastStyle/ToastStyle";
import EditButton from "../../buttons/editButton/EditButton";
import { formatDateWithoutTime, formatDateWithTime, formatTimeWithoutSeconds } from "../../../hooks/formatUtils";

const CardSubJob = React.memo(({ data, onEdit, onUpdateStatus }) => {
  const { updateSubJobStatus } = useSubJobContext();

  const handleChangeStatus = async () => {
    const response = await updateSubJobStatus(
      data.id,
      data.status === "CLOSED" ? "PENDING" : "CLOSED",
    );

    if (response != null) {
      onUpdateStatus(response);
    }
  };

  return (
    <div
      id={`job_${data.id}`}
      className={`card_subjob relative overflow-visible flex flex-col justify-center border-1 text-[#d9d9d9] max-h-[25rem]  min-h-[12rem] w-auto max-w-[27rem] min-w-[20rem] rounded-[5px] duration-100 pb-1 h-auto bg-[#1E1E1E90]
          ${
            data.status === "CLOSED" ? "border-cyan-zero" : "border-pink-zero"
          } `}
    >
      <div className="flex py-4 px-3 text-3xl font-bold items-center justify-between gap-[4px]">
        <h1 className="card_subjob_title">{data?.title}</h1>
        <img
          src={ImageDone}
          className={`h-8 duration-100  
              ${data.status === "CLOSED" ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div
        className={`border-1 transition duration-100 ${
          data.status === "CLOSED" ? "border-cyan-zero" : "border-pink-zero"
        }`}
      ></div>
      <div>
        <ul
          className={`pt-4 pb-1 text-[14px] pl-8 list-disc pr-2
                ${
                  data.status === "CLOSED"
                    ? "marker:text-pink-zero"
                    : "marker:text-cyan-zero"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Descrição: </b>
            <span className="max-h-[3rem] overflow-y-auto break-words breakable-text">
              data?.description || ""
            </span>
          </li>
          <li>
            <b>Valor: </b>
            <span className="breakable-text overflow-y-auto max-h-[3rem]">
              
              R$
              {typeof data?.value === "number"
                ? data.value.toFixed(2).replace(".", ",")
                : ""}
            </span>
          </li>
          <li>
            <b>Status: </b>
            <b
              className={`${
                data.status === "CLOSED" ? "text-cyan-zero" : "text-yellow-zero"
              }`}
            >
              {data?.status === "CLOSED" ? "Concluído" : "Pendente" || ""}
            </b>
          </li>
          <li>
            <b>Utiliza a sala?: </b>
            {data?.needsRoom ? (
              <span className="text-cyan-200">Sim</span>
            ) : (
              <span className="text-orange-300">Não</span> || ""
            )}
          </li>
          <li>
            <b>Data Prevista: </b>
            <span className="breakable-text overflow-y-auto max-h-[3rem]">
              {data?.date
                ? formatDateWithoutTime(data.date)
                : <span className="text-gray-400"> n/a</span> || ""}
            </span>
          </li>
          <li>
            <b>Horário de início: </b>
            {data?.startTime
              ? formatTimeWithoutSeconds(data.startTime)
              : <span className="text-gray-400"> n/a</span> || ""}
          </li>
          <li>
            <b>Previsão de conclusão: </b>
            {data?.expectedEndTime
              ? formatTimeWithoutSeconds(data.expectedEndTime)
              : <span className="text-gray-400"> n/a</span> || ""}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 px-3 border-t-[#ccc] items-center">
        <div className="flex justify-end w-full max-h-[12rem] mb-1 gap-2 mr-2">
          <button
            onClick={handleChangeStatus}
            className={`text-center w-[7rem] text-[14px]  hover:text-[#B9B9B9]
                  font-bold cursor-pointer duration-100 ease-in-out
                  ${
                    data.status === "CLOSED"
                      ? "text-pink-zero  "
                      : "text-cyan-zero "
                  }
                  `}
          >
            {data.status === "CLOSED" ? "Desmarcar" : "Concluir"}
          </button>
          <EditButton
            id={`edit_${data.id}`}
            text="Editar"
            onClick={() => onEdit(data)}
            className="!h-10 px-[12px] py-[6px]"
          />
        </div>
      </div>
    </div>
  );
});

export default CardSubJob;

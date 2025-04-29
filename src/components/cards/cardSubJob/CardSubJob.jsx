import React, { useEffect, useState } from "react";
import ImageDone from "../../../assets/icone-concluido.png";
import { useSubJobContext } from "../../../context/SubJobContext";
import { showToast } from "../../toastStyle/ToastStyle";
import EditButton from "../../buttons/editButton/EditButton";

const CardSubJob = React.memo(({ data, onEdit, onUpdateStatus }) => {
  const { updateSubJobStatus } = useSubJobContext();

  const handleChangeStatus = async () => {
    const currentDateTime = data.status === "CLOSED" ? null : new Date();
    const response = await updateSubJobStatus(
      data.id,
      data.status === "CLOSED" ? "PENDING" : "CLOSED",
      currentDateTime
    );

    if (response != null) {
      onUpdateStatus(response, currentDateTime);
    } else {
      showToast.error("Não foi possível atualizar o status do subserviço");
    }
  };

  const formatDateWithTime = (date) => {
    if (date != null) {
      let day;
      let month;
      let year;
      let hour;
      let minute;

      if (typeof date === "string") {
        const [datePart, timePart] = date.split("T");
        [year, month, day] = datePart.substring(0, 10).split("-");
        [hour, minute] = timePart.substring(0, 5).split(":");
      } else {
        day = String(date.getDate()).padStart(2, "0");
        month = String(date.getMonth() + 1).padStart(2, "0");
        year = date.getFullYear();
        hour = String(date.getHours()).padStart(2, "0");
        minute = String(date.getMinutes()).padStart(2, "0");
      }
      return `${day}/${month}/${year} - ${hour}:${minute}`;
    }
    return null;
  };

  const formatDateWithoutTime = (dataAtual) => {
    if (!dataAtual) return;

    const [ano, mes, dia] = dataAtual.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div
      id={`job_${data.id}`}
      className={`card_subjob relative overflow-visible flex flex-col justify-center border-1 text-[#d9d9d9] max-h-[20rem]  min-h-[12rem] w-auto max-w-[27rem] min-w-[20rem] rounded-[5px] duration-100 pb-1 h-auto bg-[#1E1E1E90]
          ${
            data.status === "CLOSED" ? "border-cyan-zero" : "border-pink-zero"
          } `}
    >
      <div className="flex py-4 px-3 text-2xl font-bold items-center gap-[4px]">
        <h1 className="card_subjob_title">{data?.title}</h1>
      </div>
      <div
        className={`border-1 transition duration-100 ${
          data.status === "CLOSED" ? "border-cyan-zero" : "border-pink-zero"
        }`}
      ></div>
      <div>
        <ul
          className={`py-4 text-[14px] pl-8 list-disc pr-2
                ${
                  data.status === "CLOSED"
                    ? "marker:text-pink-zero"
                    : "marker:text-cyan-zero"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Descrição: </b>{" "}
            <span className="max-h-[3rem] overflow-y-auto break-words breakable-text">
              {" "}
              {data?.description || ""}{" "}
            </span>
          </li>
          <li>
            <b>Valor: </b>{" "}
            <span className="breakable-text overflow-y-auto max-h-[3rem]">
              {" "}
              R${" "}
              {typeof data?.value === "number"
                ? data.value.toFixed(2).replace(".", ",")
                : ""}{" "}
            </span>
          </li>
          <li>
            <b>Data Prevista: </b>{" "}
            <span className="breakable-text overflow-y-auto max-h-[3rem]">
              {" "}
              {formatDateWithoutTime(data?.date) || ""}{" "}
            </span>
          </li>
          <li>
            <b>Status: </b>
            <b
              className={`${
                data.status === "CLOSED" ? "text-cyan-zero" : "text-yellow-zero"
              }`}
            >
              {data.status === "CLOSED" ? "Concluído" : "Pendente"}
            </b>
          </li>
          <li>
            <b>Horário de conclusão: </b>
            {formatDateWithTime(data.endTime) || "Não concluído"}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 py-2 px-3 border-t-[#ccc] items-center">
        <img
          src={ImageDone}
          className={`h-8 duration-100  
              ${data.status === "CLOSED" ? "opacity-100" : "opacity-0"}`}
        />
        <div className="flex justify-between w-[70%] max-w-[15rem] gap-2 mr-2">
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
          />
        </div>
      </div>
    </div>
  );
});

export default CardSubJob;

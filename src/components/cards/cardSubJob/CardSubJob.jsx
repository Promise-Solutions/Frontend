import React, { useState } from "react";
import ImageDone from "../../../assets/icone-concluido.png";
import { useSubJobContext } from "../../../context/SubJobContext";
import { showToast } from "../../toastStyle/ToastStyle";

const CardSubJob = React.memo(({ data, onEdit }) => {
  const [isClosed, setIsClosed] = useState(
    data == "CLOSED" ? true : false
  );
  const [timeDoneText, setTimeDoneText] = useState();
  const { updateSubJobStatus } = useSubJobContext()

  const handleChangeStatus =  async () => {
    const currentDateTime = isClosed ? null : new Date();
    const responseStatus = await updateSubJobStatus(data.id, isClosed ? "PENDING" : "CLOSED", currentDateTime);

    if(responseStatus == 204) {
      setIsClosed(!isClosed)
      const currentDateFormatted = formatCurrenteDate(currentDateTime);
      setTimeDoneText(currentDateFormatted)
    } else {
      showToast.error("Não foi possível atualizar o status do subserviço")
    }
  };

  const formatCurrenteDate = (dataAtual) => {
    if(dataAtual != null) {
      const diaAtual = String(dataAtual.getDate()).padStart(2, "0");
      const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, "0");
      const anoAtual = dataAtual.getFullYear();
      const horaAtual = String(dataAtual.getHours()).padStart(2, "0");
      const minutoAtual = String(dataAtual.getMinutes()).padStart(2, "0");
      return `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`;
    }

    return null;
  };

  return (
    <div
      id={`job_${data.id}`}
      className={`card_subjob relative overflow-visible flex flex-col justify-center border-1 pl-3 text-[#d9d9d9] max-h-[18rem] h-auto min-h-[12rem] w-auto px-3 max-w-[27rem] min-w-[20rem] rounded-[3px] duration-100 bg-[#040404AA] 
          ${
            isClosed ? "border-cyan-zero" : "border-pink-zero"
          } `
      }
    >
      <div className="flex py-2 text-2xl font-bold items-center gap-[4px]">
        <h1 className="card_subjob_title">{data?.title}</h1>
      </div>
      <div>
        <ul
          className={`py-1 text-[14px] list-none
                ${
                  isClosed ? "marker:text-pink-zero" : "marker:text-cyan-zero"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Descrição: </b> <span className="block max-h-[3rem] overflow-y-auto break-words breakable-text"> {data?.description || ""} </span>
          </li>
          <li>
            <b>Valor: </b> <span className="breakable-text overflow-y-auto max-h-[3rem]"> R$ {typeof data?.value === "number" ? data.value.toFixed(2).replace(".", ",") : ""} </span>
          </li>
          <li>
            <b>Data Prevista: </b> <span className="breakable-text overflow-y-auto max-h-[3rem]"> {data?.date || ""} </span>
          </li>
          <li>
            <b>Status: </b> 
            <b className={`${isClosed ? "text-cyan-zero":"text-yellow-zero"}`}>{isClosed ? "Concluído" : "Pendente"}</b>
          </li>
          <li>
            <b>Horário de conclusão: </b> 
            {isClosed? timeDoneText : "Não concluído"}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 py-2 mb-1 border-t-[#ccc] items-center">
        <div className="flex justify-between w-[70%] max-w-[15rem] gap-2">
            <button
              onClick={handleChangeStatus}
              className={`h-[34px] w-[7rem] text-[14px] border-2 hover:text-[#B9B9B9]
                font-bold cursor-pointer duration-100 ease-in-out
                ${isClosed} ? "text-pink-zero border-pink-zero " : "text-cyan-zero border-cyan-zero`} 
            >
              {isClosed ? "Desmarcar": "Concluir"}
            </button>
            <button
              onClick={() => onEdit() }
              className={`h-[34px] w-[7rem] text-[14px] text-yellow-zero hover:text-[#B9B9B9]
                border-2 border-yellow-zero
                font-bold cursor-pointer duration-100`}
                >
              Editar
            </button>
          </div>
          
          <img
            src={ImageDone}
            className={`h-8 ml-4 duration-100 mr-2 
              ${
                isClosed ? "opacity-100" : "opacity-0"
            }`
          }
          />
      </div>
    </div>
  );
});

export default CardSubJob;

import React, { useState, useEffect } from "react";
import ImageDone from "../../assets/icone-concluido.png";
import { useJobContext } from "../../context/JobContext";

const CardJob = React.memo(({ id, title, category, time, isDone, onClick }) => {
  // Usando apenas o estado local para controlar o status
  const [done, setDone] = useState(isDone);
  const { updateStatus } = useJobContext();

  const handleChangeStatus = async () => {
    setDone(!done);

    // Atualiza o status no backend
    await updateStatus(id, !done);
  };

  return (
    <div
      id={`job_${id}`}
      className={`card_job border-1 text-[#d9d9d9] w-3xs rounded-[5px] duration-100 pb-2 h-auto bg-[#1E1E1E88] ${
        done ? "border-[#02AEBA]" : "border-[#9A3379]"
      }`}
    >
      <div className="flex pl-5 py-6 text-2xl font-bold items-center gap-[4px]">
        <h1 className="card_job_title">{title}</h1>
      </div>
      <div>
        <div
          className={`border-1 transition duration-100 ${
            done ? "border-[#02AEBA]" : "border-[#9A3379]"
          }`}
        ></div>
        <ul
          className={`pl-8 py-6 text-[16px] list-disc 
                ${
                  done ? "marker:text-[#9A3379]" : "marker:text-[#02AEBA]"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Categoria:</b> {category}
          </li>
          <li>
            <b>Horário</b> {time}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 mb-1 border-t-[#ccc] items-center">
        <img
          src={ImageDone}
          className={`h-8 ml-4 duration-100 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="flex justify-center w-[75%]">
          <button
            onClick={handleChangeStatus}
            className={`h-[38px] w-[50%] text-[14px] py-2 text-[#d9d9d9]
                 ${
                   done
                     ? "border-[#02AEBA] hover:text-[#02AEBA]"
                     : "border-[#9A3379] hover:text-[#9A3379]"
                 } 
                 font-bold cursor-pointer border-r-1 duration-100`}
          >
            {done ? "Desmarcar" : "Concluir"}
          </button>
          <button
            onClick={onClick}
            className={`h-[38px] w-[50%] text-[14px] border-0 px-5 py-2 text-[#D9D9D9]
                 ${done ? "hover:text-[#02AEBA]" : "hover:text-[#9A3379]"} 
                 font-bold cursor-pointer hover:text-[#02AEBA] duration-100 ease-in-out`}
          >
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
});

export default CardJob;

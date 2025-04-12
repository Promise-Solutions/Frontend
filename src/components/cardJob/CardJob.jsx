import React, { useState, useEffect } from "react";
import ImageDone from "../../assets/icone-concluido.png";
import { useJobContext } from "../../context/JobContext";
import Table from "../tables/Table";


const CardJob = React.memo(({ id, title, category, jobType, client, isDone, onClick }) => {
  // Usando apenas o estado local para controlar o status
  const [done, setDone] = useState(isDone);
  const { updateStatus } = useJobContext();

  return (
    
    <div
      id={`job_${id}`}
      className={`card_job border-1 text-[#d9d9d9] w-3xs rounded-[5px] duration-100 pb-1 h-auto bg-[#1E1E1E90] ${
        done ? "border-cyan-zero" : "border-pink-zero"
      }`}
    >
      <div className="flex pl-5 py-6 text-2xl font-bold items-center gap-[4px]">
        <h1 className="card_job_title">{title}</h1>
      </div>
      <Table 
        headers={tableHeader}
        data={{id, title, category, jobType, client, isDone}}
      />
      <div>
        <div
          className={`border-1 transition duration-100 ${
            done ? "border-cyan-zero" : "border-pink-zero"
          }`}
        ></div>
        <ul
          className={`pl-8 pt-3 text-[16px] list-disc 
                ${
                  done ? "marker:text-pink-zero" : "marker:text-cyan-zero"
                } marker:duration-100 ease-in-out`}
        >
          <li>
            <b>Categoria:</b> {category}
          </li>
          <li>
            <b>Data:</b> {date}
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
        <button
          onClick={onClick}
          className={`h-[38px] text-[14px] border-0 px-5 py-2 text-[#D9D9D9]
                ${done ? "hover:text-cyan-zero" : "hover:text-pink-zero"} 
                font-bold cursor-pointer hover:text-cyan-zero duration-100 ease-in-out`}
        >
          Acessar
        </button>
      </div>
    </div>
  );
});

export default CardJob;

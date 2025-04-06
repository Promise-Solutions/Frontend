import { useEffect, useState } from "react";
import { useSubJobContext } from "../../context/SubJobContext";
import { handleInputChange, changeSubJobInfo, deleteSubJob } from "./ModalEditSubJob.script";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";

const ModalEditSubJob = ({ subJobData, setModalEditSub, isEditingSubSob, setIsEditingSubJob }) => {
  const { updateSubJobData, deleteSubJobById } = useSubJobContext();
  const [subJobsInfos, setSubJobsInfos] = useState(subJobData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div
      className={`modal_edit_subjob flex flex-col justify-center border-2 pl-3 text-[#d9d9d9] max-h-[16rem] h-auto min-h-[13rem] min-w-[8rem] w-auto px-3 max-w-[27rem] w-auto rounded-[5px] duration-100 bg-[#0D0D0D]`}
    >
      <div className="flex py-2 text-2xl font-bold items-center gap-[4px]">
        <input
          name="title" 
          value={subJobsInfos.title} 
          autocomplete="off"
          className="modal_edit_subjob_title outline-none caret-yellow-zero focus:border-b-pink-zero max-w-[18rem] border-b-1 border-b-[#A5A5A5] text-yellow-zero pb-1" 
          onChange={(e) => handleInputChange(e, setSubJobsInfos)}
          />
        <div onClick={() => setIsEditingSubJob(false)} className="flex justify-center items-center text-[12px] text-red-zero cursor-pointer rounded-[100%] border-2 border-red-zero w-5 h-5 " >x</div>
      </div>
      <div>
        <ul
          className={`py-1 text-[14px] list-none`}
        >
          <li className="flex jutify-start">
            <b className="w-[23%]">Descrição </b><b>:</b> 
            <input 
              name="description"
              value={subJobsInfos.description} 
              autocomplete="off"
              className="breakable-text min-w-[14rem] w-auto max-w-[18rem] pl-1 outline-none focus:border-b-pink-zero text-yellow-zero border-b-[#A5A5A5] border-b-1 caret-yellow-zero" 
              onChange={(e) => handleInputChange(e, setSubJobsInfos)}
            />
          </li>
          <li className="flex jutify-start">
            <b className="w-[23%]">Quantidade </b><b>:</b>
            <input 
              name="quantity"
              value={subJobsInfos.quantity} 
              autocomplete="off"
              className="breakable-text min-w-[14rem] w-auto max-w-[18rem] pl-1 outline-none text-yellow-zero border-b-[#A5A5A5] focus:border-b-pink-zero border-b-1 caret-yellow-zero" 
              onChange={(e) => handleInputChange(e, setSubJobsInfos)}
            />
          </li>
          <li className="flex jutify-start">
            <b className="w-[23%]">Valor R$</b><b>:</b>
            <input
              name="value"
              value={subJobsInfos.value}
              autocomplete="off"
              className="breakable-text min-w-[14rem] w-auto max-w-[18rem] outline-none caret-yellow-zero pl-1 text-yellow-zero focus:border-b-pink-zero border-b-[#A5A5A5] border-b-1"
              onChange={(e) => handleInputChange(e, setSubJobsInfos)}
            />
          </li>
          <li className="flex jutify-start">
            <b className="w-[23%]">Status </b><b>:</b> <b className={`${subJobsInfos.isDone ? "text-cyan-zero" : "text-yellow-zero"} pl-1`}>{subJobsInfos.isDone ? "Concluído" : "Pendente"}</b>
          </li>
          <li>
            <b>Horário de conclusão: </b> {subJobsInfos.isDone ? subJobsInfos.timeDone : "Não concluído"}
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-[100%] pr-1 py-2 mb-1 border-t-[#ccc] items-center">
        <div className="flex justify-between w-[70%] max-w-[15rem] gap-2">
          <button
            id="btn_confirm_subjob_edit"z
            onClick={() => changeSubJobInfo(subJobsInfos, updateSubJobData)}
            className={`h-[34px] w-[7rem] text-[14px] border-2 hover:text-[#B9B9B9] text-yellow-zero border-yellow-zero
                        font-bold cursor-pointer duration-100 ease-in-out`}
          >
            Confirmar
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)} 
            className={`h-[34px] w-[10rem] text-[14px] text-red-zero hover:text-[#B9B9B9]
                        border-2 border-red-zero
                        font-bold cursor-pointer duration-100`}
          >
            Excluir
          </button>
        </div>

          


      </div>
      <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => deleteSubJob(subJobsInfos.id, deleteSubJobById)}
              />
    </div>
  );
}

export default ModalEditSubJob; 
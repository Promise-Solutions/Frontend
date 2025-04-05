import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useSubJobContext } from "../../context/SubJobContext";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import ModalConfirmDelete from "../../components/ModalConfirmDelete/ModalConfirmDelete";
import ModalEditSubJob from "../../components/ModalEditSubJob/ModalEditSubJob";
import CardSubJob from "../../components/CardSubJob/CardSubJob";
import { renderSubJobs } from "./JobManagement.script";

const JobManagement = () => {
  const [subJobs, setSubJobs] = useState([]);
  const { job, setJob, fetchJobData } = useJobContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { findSubJobsByJobId } = useSubJobContext();

  useEffect(() => {
    setJob(fetchJobData(sessionStorage.getItem("jobId")))
    const cardsSubJobs = renderSubJobs(findSubJobsByJobId);
    setSubJobs(cardsSubJobs);
  },[])

    return (
        <div id="container-job-management" className="w-full">
          {/* {!isEditing ? ( */}
            <section
              id="info_section"
              className="mt-12 flex w-full justify-evenly"
            >
              <div className="flex flex-col text-[#ddd]">
                <h1 className="text-[42px]">
                  <b>Atendimento: {job?.titulo}</b> 
                </h1>
                <span className="text-[18px]">Altere as informações</span>
                <ul className="flex flex-col mt-6 gap-2">
                  <li>
                    <b>Categoria: </b> {job?.categoria}
                  </li>
                  <li>
                    <b>Horario: </b> {job?.horario}
                  </li>
                  <li>
                    <b>Status: </b> {job?.concluido ? "Concluído" : "Pendente"}
                  </li>
                </ul>
              </div>
              <PrimaryButton
                id="button_edit"
                text="Editar Atendimento"
                // onClick={() => setIsEditing(true)}
              />
            </section>
          <section className="dropdown_section">
            <div className="gap-4 border-t-1 border-[#d9d9d91F] flex flex-wrap justify-center mt-12 max-h-[330px] py-[35px] overflow-y-auto w-full h-auto">
              {subJobs != null ? subJobs : <p className="text-center text-gray-400">Nenhum subserviço encontrado para esse atendimento</p>}
            </div>
          </section>
          {/* <div className="flex justify-end">
            <DeleteButton
              id="delete_button"
              text="Deletar Usuário"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
          <ModalConfirmDelete
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            // onConfirm={handleDeleteUser}
          /> */}
        </div>
      );
    
}

export default JobManagement
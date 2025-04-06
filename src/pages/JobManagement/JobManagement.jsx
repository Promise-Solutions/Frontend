import React, { useState, useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useSubJobContext } from "../../context/SubJobContext";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import ModalConfirmDelete from "../../components/ModalConfirmDelete/ModalConfirmDelete";
import { renderSubJobs, handleInputChange, saveChanges, deleteJob } from "./JobManagement.script";
import Input from "../../components/Form/Input";
import { useNavigate } from "react-router-dom";

const JobManagement = () => {
  const [subJobs, setSubJobs] = useState([]);
  const { setJob, fetchJobData, updateJobData, deleteJobById } = useJobContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { findSubJobsByJobId } = useSubJobContext();
  const [jobData, setJobData ] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadJobData = async () => {
      const jobId = sessionStorage.getItem("jobId");
      const jobData = await fetchJobData(jobId);
      setJob(jobData);
      setJobData(jobData); 
      const cardsSubJobs = await renderSubJobs(findSubJobsByJobId);
      setSubJobs(cardsSubJobs);
    };

    loadJobData();
  },[])

    return (
        <div id="container-job-management" className="w-full h-100vh flex flex-col justify-between">
          {!isEditing ? (
            <section
              id="info_section"
              className="mt-12 flex w-full justify-evenly"
            >
              <div className="flex flex-col text-[#ddd]">
                <h1 className="text-[42px]">
                  <b>Serviço: {jobData?.titulo}</b> 
                </h1>
                <span className="text-[18px]">Altere as informações</span>
                <ul className="flex flex-col mt-6 gap-2">
                  <li>
                    <b>Categoria: </b> {jobData?.categoria}
                  </li>
                  <li>
                    <b>Data: </b> {jobData?.data}
                  </li>
                  <li>
                    <b>Horario: </b> {jobData?.horario}
                  </li>
                  <li>
                    <b  >Status: </b> 
                      <span className={`${jobData?.concluido ? "text-cyan-zero" : "text-yellow-zero"}`}>
                          {jobData?.concluido ? "Concluído" : "Pendente"}
                      </span>    
                  </li>
                </ul>
              </div>
              <PrimaryButton
                id="button_edit"
                text="Editar Serviço"
                onClick={() => setIsEditing(true)}
              />
            </section>
          )
          :
          (
            <section id="job_edit_section" className="mt-12 flex px-[4em] w-full text-white justify-between">
              <div className="flex flex-col">
                <h1 className="text-[42px]">
                  <b>Editar Informações</b>
                </h1>
                <span className="text-[18px]">Altere as informações</span>
                <ul className="flex flex-col mt-6 gap-2">
                  <li>
                    <Input
                      text="Titulo"
                      type="text"
                      name="titulo"
                      value={jobData.titulo}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                    />
                  </li>
                  <li>
                    <Input
                      text="Categoria"
                      type="text"
                      name="categoria"
                      value={jobData.categoria}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                    />
                  </li>
                  <li>
                    <Input
                      text="Data"
                      type="text"
                      name="data"
                      value={jobData.data}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                      />
                  </li>
                  <li>
                    <Input
                      text="Horário"
                      type="text"
                      name="horario"
                      value={jobData.horario}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                      />
                  </li>
                </ul>
              <div className="flex mt-10">
                <DeleteButton
                  id="delete_button"
                  text="Deletar Serviço"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </div>
              <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => deleteJob(deleteJobById, jobData.id, navigate)}
              />
              </div>
              <div className="flex flex-col gap-5">
                <PrimaryButton
                  id="button_confirm_job_edit"
                  text="Salvar Alterações"
                  onClick={() => saveChanges(updateJobData, jobData)}
                  />
                <PrimaryButton
                  id="button_cancel_job_edit"
                  text="Cancelar Alterações"
                  onClick={() => setIsEditing(!isEditing)}
                  className="!border-[#C5C5C5] !text-[#C5C5C5] hover:!border-cyan-zero hover:!text-cyan-zero"
                  />
              </div>
            </section>
          )}
          <section className="dropdown_section">
            <div className="gap-4 border-t-1 border-[#d9d9d91F] flex flex-wrap justify-center items-start mt-12 max-h-[330px] py-[35px] mx-10 overflow-y-auto w-full h-auto">
              {subJobs != null ? subJobs : <p className="text-center text-gray-400">Nenhum subserviço encontrado para esse serviço</p>}
            </div>
          </section>
        </div>
      );
    
}

export default JobManagement
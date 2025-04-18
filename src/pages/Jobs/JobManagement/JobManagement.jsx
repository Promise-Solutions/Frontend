import React, { useState, useEffect } from "react";
import { useJobContext } from "../../../context/JobContext";
import { useSubJobContext } from "../../../context/SubJobContext";
import PrimaryButton from "../../../components/buttons/primaryButton/PrimaryButton";
import DeleteButton from "../../../components/buttons/deleteButton/DeleteButton";
import ModalConfirmDelete from "../../../components/modals/modalConfirmDelete/ModalConfirmDelete";
import { renderSubJobs, handleInputChange, saveChanges, deleteJob, registerRedirect } from "./JobManagement.script";
import Input from "../../../components/form/Input";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../../../components/buttons/registerButton/RegisterButton";
import Select from "../../../components/form/Select";
import { editSubJobsInfos } from "./JobManagement.script";

const JobManagement = () => {
  const [subJobs, setSubJobs] = useState([]);
  const [subJobIdToEdit, setSubJobIdToEdit] = useState(null);
  const [subJobDataToEdit, setSubJobDataToEdit] = useState(null);
  const { job, setJob, fetchJobData, updateJobData, deleteJobById } = useJobContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSubJob, setIsEditingSubJob] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalEditSubJob, setModalEditSubJob] = useState(null);
  const { findSubJobsByJobId } = useSubJobContext();
  const [jobData, setJobData ] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadJobData = async () => {
      const jobId = sessionStorage.getItem("jobId");
      const jobDatFetched = await fetchJobData(jobId);
      setJob(jobDatFetched);
      setJobData(jobDatFetched);

      const cardsSubJobs = await renderSubJobs(findSubJobsByJobId, setModalEditSubJob, isEditingSubJob, setIsEditingSubJob, setSubJobIdToEdit, setSubJobDataToEdit);
      setSubJobs(cardsSubJobs);
    };

    loadJobData();
  },[])

  useEffect(() => {
      if(isEditingSubJob) {
        const modalEdit = editSubJobsInfos(subJobDataToEdit, setModalEditSubJob, isEditingSubJob, setIsEditingSubJob);
        setModalEditSubJob(modalEdit);
      
      } else {
        setModalEditSubJob(null);
      }
    },[isEditingSubJob])
  



  const categoryOptions = [
    {id: "Ensaio Musical", name: "Ensaio Musical"},
    {id: "Podcast", name: "Podcast"},
    {id: "Estudio Fotografico", name: "Estúdio Fotográfico"}
  ] 

  const typeOptions = [
    {id: "AVULSO", name: "Avulso"},
    {id: "MENSAL", name: "Mensal"}
  ]

    return (
        <div id="container-job-management" className="w-full h-100vh flex flex-col justify-between">
          {modalEditSubJob}
          {!isEditing ? (
            <section
              id="info_section"
              className="mt-12 mx-16 flex justify-between"
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
                    <b>Tipo de Serviço: </b> {jobData?.tipoServico}
                  </li>
                  <li>
                    <b>Status: </b> 
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
            <section id="job_edit_section" className="mt-12 flex mx-16 text-white justify-between">
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
                  <Select
                    text="Categoria"
                    name="categoria"
                    options={categoryOptions}
                    handleOnChange={handleInputChange}
                    value={jobData.categoria}
                  />
                  </li>
                  <li>
                    <Select
                      text="Tipo do serviço"
                      name="tipoServico"
                      options={typeOptions}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                      value={jobData.tipoServico}
                      />
                  </li>
                </ul>
              <div className="flex mt-10">
              <PrimaryButton
                id="button_confirm_job_edit"
                text="Salvar Alterações"
                onClick={() => saveChanges(updateJobData, jobData)}
                />
              </div>
              <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => deleteJob(deleteJobById, jobData.id, navigate)}
                title={"Deletar Serviço"}
                description={"Tem certeza de que deseja deletar este serviço?"}
              />
              </div>
              <div className="flex flex-col gap-5">
                <DeleteButton
                  id="delete_button"
                  text="Deletar Serviço"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
                <PrimaryButton
                  id="button_cancel_job_edit"
                  text="Cancelar Alterações"
                  onClick={() => {
                    setJobData(job)  
                    setIsEditing(!isEditing)
                  }}
                  className="!border-[#C5C5C5] !text-[#C5C5C5] hover:!border-cyan-zero hover:!text-cyan-zero"
                  />
              </div>
            </section>
          )}
          <div className="self-end mr-15">
            <RegisterButton
              id="register_button"
              title="Registrar subserviço"
              text="+"
              onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
            />
            </div>
          <section className="dropdown_section">
            <div className="gap-4 border-t-1 border-[#d9d9d91F] flex flex-wrap justify-center items-start mt-12 max-h-[330px] py-[35px] overflow-y-auto w-full h-auto">
              {subJobs != null ? subJobs : <p className="text-center text-gray-400">Nenhum subserviço encontrado para esse serviço</p>}
            </div>
          </section>
        </div>
      );
    
}

export default JobManagement
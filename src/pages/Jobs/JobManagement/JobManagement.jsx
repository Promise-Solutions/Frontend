import React, { useState, useEffect } from "react";
import { useJobContext } from "../../../context/JobContext";
import { useSubJobContext } from "../../../context/SubJobContext";
import PrimaryButton from "../../../components/buttons/primaryButton/PrimaryButton";
import DeleteButton from "../../../components/buttons/deleteButton/DeleteButton";
import ModalConfirmDelete from "../../../components/modals/modalConfirmDelete/ModalConfirmDelete";
import CardSubJob from "../../../components/cards/cardSubJob/CardSubJob";
import Input from "../../../components/form/Input";
import { useNavigate, useParams } from "react-router-dom";
import RegisterButton from "../../../components/buttons/registerButton/RegisterButton";
import Select from "../../../components/form/Select";
import { handleInputChange, registerRedirect, saveChanges, deleteJob } from "./JobManagement.script";
import { getCategoryTranslated, getServiceTypeTranslated, getStatusTranslated } from "../../../hooks/translateAttributes";
import ModalEditSubJob from "../../../components/modals/modalEditSubJob/ModalEditSubJob";
import CancelButton from "../../../components/modals/modalConfirmDelete/cancelButton";

const JobManagement = () => {
  const { jobId } = useParams();
  const { job, setJob, fetchJobData, updateJobData, deleteJobById } = useJobContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { findSubJobsByJobId } = useSubJobContext();
  const [jobData, setJobData ] = useState();
  const [subJobsData, setSubJobsData] = useState([]);
  const [editingSubJob, setEditingSubJob] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const loadJobData = async () => {
      const jobDataFetched = await fetchJobData(jobId);
      setJob(jobDataFetched);
      setJobData(jobDataFetched);
    }
    loadJobData();

    (async () => {
      const subJobs = await findSubJobsByJobId(jobId);
      setSubJobsData(subJobs);
    })();
  }, [jobId]);

  const handleChangeSubJobStatus = (response) => {
    setSubJobsData((prev) => 
      prev.map((subJob) => 
        (subJob.id === response.subJobId ? 
          {...subJob, status: response.subJobStatus} 
          : subJob))
    )
    
    setJobData((jobData) => ({
      ...jobData,
      status: response.jobStatus
    }))
  }

  const handleUpdateJobData = async (updateJobData, jobData) => {
    const responseData = await saveChanges(updateJobData, jobData)
    if(responseData) {
      setJobData(responseData)
      setIsEditing(false)
    }
  }

  const handleSubJobUpdated = (subJobUpdated, jobTotalValue) => {
    setSubJobsData((prev) =>
      prev.map((subJob) => (subJob.id === subJobUpdated.id ? subJobUpdated : subJob))
    );
    setJobData((jobData) => ({
      ...jobData,
      totalValue: jobTotalValue
    }))

    setEditingSubJob(null);
  };

  const handleSubJobDeleted = (response) => {
    setSubJobsData((prev) =>
      prev.filter((subJob) => (subJob.id !== response.id))
    );
    setJobData((jobData) => ({
      ...jobData,
      status: response.jobStatus,
      totalValue: response.jobTotalValue
    }))
    
    setEditingSubJob(null);
  }

  const categoryOptions = [
    {id: "MUSIC_REHEARSAL", name: "Ensaio Musical"},
    {id: "PODCAST", name: "Podcast"},
    {id: "PHOTO_VIDEO_STUDIO", name: "Estúdio Fotográfico"}
  ] 

  const typeOptions = [
    {id: "SINGLE", name: "Avulso"},
    {id: "MONTHLY", name: "Mensal"}
  ]

    return (
        <div id="container-job-management" className="w-full h-100vh flex flex-col justify-between">
          {editingSubJob && (
            <ModalEditSubJob 
              subJobData={editingSubJob}
              onCancel={() => setEditingSubJob(null)}
              onSave={handleSubJobUpdated}
              onDelete={handleSubJobDeleted}
            />
          )}
          {!isEditing ? (
            <section
              id="info_section"
              className="mt-12 mx-16 flex justify-between"
            >
              <div className="flex flex-col text-[#ddd]">
                <h1 className="text-[42px]">
                  <b>Serviço: {jobData?.title}</b> 
                </h1>
                <span className="text-[18px]">Altere as informações</span>
                <ul className="flex flex-col mt-6 gap-2">
                  <li>
                    <b>Categoria: </b> {getCategoryTranslated(jobData?.category)}
                  </li>
                  <li>
                    <b>Tipo de Serviço: </b> {getServiceTypeTranslated(jobData?.serviceType)}
                  </li>
                  <li>
                    <b>Valor Total do Serviço: </b> 
                      {typeof jobData?.totalValue === "number" 
                      ? `R$ ${jobData.totalValue.toFixed(2).replace(".", ",")}` 
                      : "Erro ao buscar valor total"}
                  </li>
                  <li>
                    <b>Status: </b> 
                      <span className={`${jobData?.status === "PENDING" ? "text-yellow-zero font-semibold": jobData?.status === "CLOSED" ? "text-cyan-zero font-semibold": "text-pink-zero font-semibold"}`}>{getStatusTranslated(jobData?.status)}
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
                      name="title"
                      required
                      value={jobData.title}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                    />
                  </li>
                  <li>
                    <Select
                      text="Categoria"
                      name="category"
                      required
                      options={categoryOptions}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                      value={jobData.category}
                    />
                  </li>
                  <li>
                    <Select
                      text="Tipo do serviço"
                      name="serviceType"
                      required
                      options={typeOptions}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                      value={jobData.serviceType}
                      />
                  </li>
                </ul>
              <div className="flex mt-10">
              <PrimaryButton
                id="button_confirm_job_edit"
                text="Salvar Alterações"
                onClick={() => handleUpdateJobData(updateJobData, jobData)}
          
                />
              </div>
              <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => deleteJob(deleteJobById, jobId, navigate, setIsDeleteModalOpen)}
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
                <CancelButton
                  id="button_cancel_job_edit"
                  text="Cancelar Alterações"
                  onClick={() => {
                    setJobData(job)  
                    setIsEditing(!isEditing)
                  }}
                  />
                  
              </div>
            </section>
          )}
          <div className="self-end mr-15">
            <RegisterButton
              id="register_button"
              title="Cadastrar subserviço"
              text="+"
              onClick={() => registerRedirect(navigate, jobId)} // Pass navigate to registerRedirect
            />
            </div>
          <section className="dropdown_section flex items-center justify-center">
            <div className="flex flex-row gap-4 border-x border-[#d9d9d91F] justify-center items-center mt-12 min-h-[15rem] px-[45px] py-[15px] max-h-[24rem] overflow-x-auto overflow-y-hidden w-[97%]">
            {subJobsData.length > 0 ? (
                subJobsData.map((subJob) => (
                  <CardSubJob
                    key={subJob.id}
                    data={subJob}
                    onEdit={() => setEditingSubJob(subJob)}
                    onUpdateStatus={handleChangeSubJobStatus}
                    setModalEditSubJob
                    isEditingSubJob 
                    setIsEditingSubJob
                    setSubJobDataToEdit
                  />
                ))
              ) : (
                <p className="text-center text-gray-400">Nenhum subserviço</p>
              )}
            </div>
          </section>
        </div>
      );
}

export default JobManagement
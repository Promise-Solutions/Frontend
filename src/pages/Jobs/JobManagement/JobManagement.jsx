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
      console.log("jobID " + jobId )
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

  const handleSubJobUpdated = (subJobUpdated) => {
    setSubJobsData((prev) =>
      prev.map((subJob) => (subJob.id === subJobUpdated.id ? subJobUpdated : subJob))
    );
    setEditingSubJob(null);
  };

  const handleSubJobDeleted = (subJobIdDeleted) => {
    setSubJobsData((prev) =>
      prev.filter((subJob) => (subJob.id !== subJobIdDeleted))
    );
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
                    <b>Status: </b> 
                      <span className={`${jobData?.status === "PENDING" ? "text-yellow-zero": jobData?.status === "CLOSED" ? "text-cyan-zero": "text-red-zero"}`}>{getStatusTranslated(jobData?.status)}
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
                      value={jobData.title}
                      handleOnChange={(e) => handleInputChange(e, setJobData)}
                    />
                  </li>
                  <li>
                  <Select
                    text="Categoria"
                    name="category"
                    options={categoryOptions}
                    handleOnChange={(e) => handleInputChange(e, setJobData)}
                    value={jobData.category}
                  />
                  </li>
                  <li>
                    <Select
                      text="Tipo do serviço"
                      name="serviceType"
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
                onClick={() => saveChanges(updateJobData, jobData)}
                />
              </div>
              <ModalConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => deleteJob(deleteJobById, jobId, navigate)}
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
              onClick={() => registerRedirect(navigate, jobId)} // Pass navigate to registerRedirect
            />
            </div>
          <section className="dropdown_section">
            <div className="gap-4 border-t-1 border-[#d9d9d91F] flex flex-wrap justify-center items-start mt-12 max-h-[330px] py-[35px] overflow-y-auto w-full h-auto">
            {subJobsData.length > 0 ? (
                subJobsData.map((subJob) => (
                  <CardSubJob
                    key={subJob.id}
                    data={subJob}
                    onEdit={() => setEditingSubJob(subJob)}
                    setModalEditSubJob
                    isEditingSubJob 
                    setIsEditingSubJob
                    setSubJobDataToEdit
                  />
                ))
              ) : (
                <p>Nenhum subserviço</p>
              )}
            </div>
          </section>
        </div>
      );
}

export default JobManagement
import React, { useState, useEffect } from "react";
import Pagination from "../../../components/pagination/pagination.jsx";
import { useJobContext } from "../../../context/JobContext";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DeleteButton from "../../../components/buttons/action/DeleteButton";
import ModalConfirmDelete from "../../../components/modals/ModalConfirmDelete";
import CardSubJob from "../../../components/cards/CardSubJob";
import Input from "../../../components/form/Input";
import { useNavigate, useParams } from "react-router-dom";
import RegisterButton from "../../../components/buttons/action/RegisterButton";
import Select from "../../../components/form/Select";
import {
  handleInputChange,
  registerRedirect,
  saveChanges,
  deleteJob,
} from "./JobManagement.script";
import { axiosProvider } from "../../../provider/apiProvider";
import {
  getCategoryTranslated,
  getServiceTypeTranslated,
  getStatusTranslated,
} from "../../../hooks/translateAttributes";
import ModalEditSubJob from "../../../components/modals/edit/modalEditSubJob/ModalEditSubJob";
import CancelButton from "../../../components/buttons/action/CancelButton";
import { SyncLoader } from "react-spinners";
import { getBRCurrency } from "../../../hooks/formatUtils";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import ModalAllSubJobs from "../../../components/modals/ModalAllSubJobs";

const JobManagement = () => {
  const { jobId } = useParams();
  const { job, fetchJobData, updateJobData, deleteJobById } =
    useJobContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobData, setJobData] = useState();
  const [subJobsData, setSubJobsData] = useState([]);
  const [subJobsPage, setSubJobsPage] = useState(1);
  const [subJobsTotalPages, setSubJobsTotalPages] = useState(1);
  // Removido estado não utilizado: firstFiveSubJobs
  const [editingSubJob, setEditingSubJob] = useState(null);
  const [isModalAllSubJobsOpen, setIsModalAllSubJobsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const categoryOptions = [
    { id: "MUSIC_REHEARSAL", name: "Ensaio Musical" },
    { id: "PODCAST", name: "Podcast" },
    { id: "PHOTO_VIDEO_STUDIO", name: "Estúdio Fotográfico" },
  ];

  const typeOptions = [
    { id: "SINGLE", name: "Avulso" },
    { id: "MONTHLY", name: "Mensal" },
  ];

  useEffect(() => {
    const loadJobData = async () => {
      const jobDataFetched = await fetchJobData(jobId);
      setJobData(jobDataFetched);
    };
    loadJobData();
  }, [jobId]);

  useEffect(() => {
    const fetchSubJobs = async () => {
      setIsLoading(true);
      try {
        const pageSize = 4;
        const response = await axiosProvider.get(
          `/sub-jobs/job?fkService=${jobId}&size=${pageSize}&page=${
            subJobsPage - 1
          }`
        );
        const data = response.data || {};
        setSubJobsData(data.content || []);
        setSubJobsTotalPages(data.totalPages || 1);
      } catch (err) {
        setSubJobsData([]);
        setSubJobsTotalPages(1);
        console.error("Erro ao buscar subserviços:", err);
      }
      setIsLoading(false);
    };
    if (jobId) fetchSubJobs();
  }, [jobId, subJobsPage]);

  const handleChangeSubJobStatus = (response) => {

    setSubJobsData((prev) =>
      prev.map((subJob) =>
        subJob.id === response.subJobId
          ? { ...subJob, status: response.subJobStatus }
          : subJob
      )
    );

    setJobData((jobData) => ({
      ...jobData,
      status: response.jobStatus,
    }));
  };

  const handleUpdateJobData = async (updateJobData, jobData) => {
    const responseData = await saveChanges(updateJobData, jobData);
    if (responseData) {
      setJobData(responseData);
      setIsEditing(false);
    }
  };

  const handleSubJobUpdated = (subJobUpdated, jobTotalValue) => {
    // Removido setFirstFiveSubJobs

    setSubJobsData((prev) =>
      prev.map((subJob) =>
        subJob.id === subJobUpdated.id ? subJobUpdated : subJob
      )
    );
    setJobData((jobData) => ({
      ...jobData,
      totalValue: jobTotalValue,
    }));

    setEditingSubJob(null);
  };

  const handleSubJobDeleted = (response) => {
    // Removido setFirstFiveSubJobs

    setSubJobsData((prev) =>
      prev.filter((subJob) => subJob.id !== response.id)
    );
    setJobData((jobData) => ({
      ...jobData,
      status: response.jobStatus,
      totalValue: response.jobTotalValue,
    }));

    setEditingSubJob(null);
    sortFirstFiveSubJobs(subJobsData);
  };

  const sortFirstFiveSubJobs = (subJobs) => {
    const subJobsSorted = subJobs.sort(
      (a, b) => parseDataHora(a) - parseDataHora(b)
    );
    return subJobsSorted.slice(0, 5);
  };

  function parseDataHora(subJob) {
    const date = subJob.date;
    let time = subJob.startTime;

    if (date == null) {
      return new Date(8640000000000000);
    }
    if (time == null) {
      time = "23:59:59";
    }

    return new Date(`${date}T${time}`);
  }

  return (
    <div
      id="container-job-management"
      className="slide-in-ltr w-full flex flex-col "
    >
      <Breadcrumbs className="px-16" />
      {editingSubJob && (
        <>
          <Breadcrumbs className="px-16" />
          <ModalEditSubJob
            subJobData={editingSubJob}
            onCancel={() => setEditingSubJob(null)}
            onSave={handleSubJobUpdated}
            onDelete={handleSubJobDeleted}
            setEditingSubJob={setEditingSubJob}
          />
        </>
      )}

      {isModalAllSubJobsOpen && (
        <ModalAllSubJobs
          closeModal={() => setIsModalAllSubJobsOpen(false)}
          subJobs={subJobsData}
          jobId={jobData.id}
          handleChangeSubJobStatus={handleChangeSubJobStatus}
          setEditingSubJob={setEditingSubJob}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[40vh]">
          <SyncLoader
            size={8}
            loading={true}
            color={"#02AEBA"}
            speedMultiplier={2}
          />
        </div>
      ) : !isEditing ? (
        <section id="info_section" className="mt-12 mx-16 flex justify-between">
          <div className="flex flex-col text-[#ddd]">
            <h1 className="text-[42px]">
              <b>Serviço: {jobData?.title}</b>
            </h1>
            <ul className="flex flex-col mt-6 gap-2">
              <li>
                <b>Categoria: </b> {getCategoryTranslated(jobData?.category)}
              </li>
              <li>
                <b>Tipo de Serviço: </b>{" "}
                {getServiceTypeTranslated(jobData?.serviceType)}
              </li>
              <li>
                <b>Valor Total do Serviço: </b>
                {typeof jobData?.totalValue === "number"
                  ? getBRCurrency(jobData.totalValue)
                  : "Erro ao buscar valor total"}
              </li>
              <li>
                <b>Status: </b>
                <span
                  className={`${
                    jobData?.status === "PENDING"
                      ? "text-yellow-zero font-semibold"
                      : jobData?.status === "CLOSED"
                      ? "text-cyan-zero font-semibold"
                      : "text-pink-zero font-semibold"
                  }`}
                >
                  {getStatusTranslated(jobData?.status)}
                </span>
              </li>
            </ul>
          </div>
          <PrimaryButton
            id="button_edit"
            text="Editar Serviço"
            onClick={() => setIsEditing(true)}
            className="h-14"
          />
        </section>
      ) : (
        <section
          id="job_edit_section"
          className="mt-12 flex mx-16 text-white justify-between"
        >
          <div className="flex flex-col">
            <h1 className="text-[42px]">
              <b>Editar Informações</b>
            </h1>
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
              onConfirm={() =>
                deleteJob(deleteJobById, jobId, navigate, setIsDeleteModalOpen)
              }
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
                setJobData(job);
                setIsEditing(!isEditing);
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
      <section className="dropdown_section flex flex-col items-center justify-center mx-15">
        <div className="flex justify-between items-center w-[99%] mt-6">
          <p className="text-gray-400 text-[20px] font-semibold">
            Subserviços Associados
          </p>
        </div>
        <div className="flex flex-row gap-4 justify-left items-center min-h-[15rem] py-[6px] max-h-[27rem] w-auto overflow-r-auto overflow-y-hidden max-w-[99%]">
          {isLoading ? (
            <SyncLoader
              size={8}
              loading={true}
              color={"#02AEBA"}
              speedMultiplier={2}
            />
          ) : subJobsData.length > 0 ? (
            subJobsData.map((subJob) => (
              <CardSubJob
                key={subJob.id}
                data={{ ...subJob, jobId: jobId }}
                onEdit={() => setEditingSubJob(subJob)}
                onUpdateStatus={handleChangeSubJobStatus}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">
              Nenhum subserviço encontrado
            </p>
          )}
        </div>
        <div className="flex justify-center mt-4 text-gray-400">
          <Pagination
            page={subJobsPage}
            totalPages={subJobsTotalPages}
            onPageChange={setSubJobsPage}
          />
        </div>
      </section>
    </div>
  );
};

export default JobManagement;

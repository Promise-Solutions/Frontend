import { showToast } from "../../../components/toastStyle/ToastStyle";
import { ROUTERS } from "../../../constants/routers";

export const handleInputChange = (e, setJobData) => {
  const { name, value } = e.target;
  setJobData(prev => ({ ...prev, [name]: value }));
}

export const registerRedirect = (navigate, jobId) => {
  navigate(ROUTERS.getSubJobRegister(jobId))
}

export const saveChanges = async (updateJobData, job) => {
    if(job.id == null || job.title == "" || job.category == "" || job.serviceType == "") {
      showToast.error("Campos vazios não são aceitos!")
      return;
    } 
    const jobId = job.id   
    return await updateJobData(jobId, job)
}
  
export const deleteJob = async (deleteJobById, id, navigate, setIsDeleteModalOpen) => {
    const response = await deleteJobById(id)
        
    setIsDeleteModalOpen(false)
    if (response == 200) {
      navigate(ROUTERS.JOBS);
    } else if(response == 409) {
      console.log("Erro! Não é possível excluir um serviço com subserviços associados");
      showToast.error("Não é possível excluir um serviço com subserviços associados");
    }
}
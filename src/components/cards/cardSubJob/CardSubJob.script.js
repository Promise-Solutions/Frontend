import ModalEditSubJob from "../../modals/modalEditSubJob/ModalEditSubJob"

export const editSubJobsInfos = (subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob) => {
   
    if(isEditingSubJob) {
        const modalEditSubJob = React.createElement(ModalEditSubJob, { subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob })

        return modalEditSubJob;
    } 
}
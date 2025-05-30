import ModalEditSubJob from "../../modals/edit/modalEditSubJob/ModalEditSubJob"

export const editSubJobsInfos = (subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob) => {
    if(isEditingSubJob) {
        const modalEditSubJob = React.createElement(ModalEditSubJob, { subJobData, setModalEditSub, isEditingSubJob, setIsEditingSubJob })

        return modalEditSubJob;
    } 
}
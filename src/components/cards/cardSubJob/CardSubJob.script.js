import ModalEditSubJob from "../../modals/modalEditSubJob/ModalEditSubJob"
import React from "react"

export const editInfos = (subJobData, setModalEditSub, isEditingSubSob, setIsEditingSubJob) => {
        if(isEditingSubSob) {
            console.log(subJobData)
            const modalEditSubJob = React.createElement(ModalEditSubJob, { subJobData, setModalEditSub, isEditingSubSob, setIsEditingSubJob })

            console.log("editInfos modal", modalEditSubJob)
            return modalEditSubJob;
        } 
}
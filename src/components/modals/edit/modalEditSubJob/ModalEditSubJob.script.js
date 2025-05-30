import { showToast, ToastStyle } from "../../../toastStyle/ToastStyle";

export const handleInputChange = (e, setSubJobsInfos) => {
    const { name, value } = e.target;
    setSubJobsInfos(prev => ({ ...prev, [name]: value }));
}

export const changeSubJobData = async (infos, updateSubJobData) => {
    if(!infos.title || !infos.description || infos.value == null || infos.value == "") {
        showToast.error("Todos os campos devem estar preenchidos!")
        return;
    } 
    if(infos.value < 0) {
        showToast.error("Não são aceitos valores negativos!")
        return;
    } 
    console
    if(
      infos.needsRoom 
      && (
           infos.date == null || infos.date == "" 
        || infos.startTime == null || infos.startTime == "" 
        || infos.expectedEndTime == null || infos.expectedEndTime == ""
      )) {
        showToast.error("Quando há o uso de sala, a data os horários precisam ser informados!")
        return;
    }
    if(infos.startTime > infos.expectedEndTime) {
        showToast.error("O horário de início não pode vir após ao de conclusão")
        return;
    }
    return await updateSubJobData(infos);
}
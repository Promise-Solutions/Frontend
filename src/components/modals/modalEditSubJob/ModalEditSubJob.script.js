import toast from "react-hot-toast";
import { ToastStyle } from "../../toastStyle/ToastStyle";

export const handleInputChange = (e, setSubJobsInfos) => {
    const { name, value } = e.target;
    setSubJobsInfos(prev => ({ ...prev, [name]: value }));
}

export const deleteSubJob = async (subJobId, deleteSubJobById) => {
   return await deleteSubJobById(subJobId)
}

export const changeSubJobData = async (infos, updateSubJobData) => {
    if(!infos.title || !infos.description || infos.value == null  || !infos.expectedDate) {
        toast.error("Todos os campos devem estar preenchidos!", { style: ToastStyle })
        return;
    } 
    if(infos.quantity == 0) {
        toast.error("A quantidade não pode ser 0 ou vazia!", { style: ToastStyle })
        return;
    }
    if(infos.quantity < 0 || infos.value < 0) {
        toast.error("Não são aceitos valores negativos!", { style: ToastStyle })
        return;
    } 

    const expectedDateFormatted = formatDate(infos.expectedDate)
    const infosToUpdate = {
        ...infos,
        expectedDate: expectedDateFormatted
    }
    
    await updateSubJobData(infosToUpdate);
}


const formatDate = (dataString) => {
    const dataDate = new Date(dataString);

    const dia = String(dataDate.getUTCDate()).padStart(2, '0');
    const mes = String(dataDate.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataDate.getUTCFullYear();
    
    const dataFormatada = `${dia}/${mes}/${ano}`

    return dataFormatada;
}

export const getNumericValue = (valueString) => {
  if(typeof valueString === "string" && valueString.includes(",")) {
    valueString = valueString.replace(",", ".");
  }
  return parseFloat(valueString);
};
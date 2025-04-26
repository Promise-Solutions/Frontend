import toast from "react-hot-toast"
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";

export const registrarSubServico = async (formData, saveSubJob) => {
    if(formData.title == "" || formData.description == "" || formData.value == NaN || formData.date == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }
    
    const dataAtual = new Date();
    
    formData = {...formData, startTime: dataAtual, endTime: null,  status: "PENDING"}
    const responseCode = await saveSubJob(formData)
    return responseCode
}

const formatDate = (dataAtual) => {
    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();
    const horaAtual = String(dataAtual.getHours()).padStart(2, '0');
    const minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0');
    
    const dataAtualFormatada = `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`
    return dataAtualFormatada;
}
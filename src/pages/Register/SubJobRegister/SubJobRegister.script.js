import toast from "react-hot-toast"
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";

export const registrarSubServico = async (formData, saveSubJob) => {
    if(formData.title == "" || formData.description == "" || formData.value == "" || formData.date == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }
    
    const dataAtual = new Date();
    
    formData = {...formData, startTime: dataAtual, endTime: null,  status: "PENDING"}
    const responseCode = await saveSubJob(formData)
    return responseCode
}

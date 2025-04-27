import toast from "react-hot-toast"
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";

export const registrarServico = async (formData, saveJob) => {
    if(formData.title == "" || formData.serviceType == "" || formData.category == "" || formData.fkClient == null || formData.fkClient == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }

    formData = {...formData, totalValue: 0, status: "PENDING", }
    await saveJob(formData)
}

export const createClientsOptions = async (findClients) => {
    const response = await findClients();

    if(response != null) {
        return response;
    } else {
        return [];
    }
}
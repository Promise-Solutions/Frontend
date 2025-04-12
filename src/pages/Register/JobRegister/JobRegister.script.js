import toast from "react-hot-toast"
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";

export const registrarServico = async (formData, saveJob) => {
    if(formData.titulo == "" || formData.tipoServico == "" || formData.categoria == "" || formData.fkCliente == null || formData.fkCliente == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }

    formData.fkCliente = parseInt(formData.fkCliente)

    formData = {...formData, concluido: false}

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
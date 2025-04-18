import toast from "react-hot-toast"
import { ToastStyle } from "../../../components/toastStyle/ToastStyle";

export const registrarSubServico = async (formData, saveSubJob) => {
    if(formData.titulo == "" || formData.descricao == ""|| formData.quantidade == "" || formData.quantidade == 0 || formData.valor == NaN || formData.dataPrevista == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }
    
    const dataAtual = new Date();
    const dataAtualFormatada = formatDate(dataAtual);
    const idServico = sessionStorage.getItem("jobId")
    
    formData = {...formData, dataHorarioInicio: dataAtualFormatada, dataHoraConclusao: null,  concluido: false, fkServico: idServico}
    await saveSubJob(formData)

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
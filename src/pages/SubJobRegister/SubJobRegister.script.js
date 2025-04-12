import toast from "react-hot-toast"
import { ToastStyle } from "../../components/toastStyle/ToastStyle";

export const registrarSubServico = async (formData, saveSubJob) => {
    if(formData.titulo == "" || formData.descricao == "" || formData.valor == NaN || formData.dataPrevista == "") {
        toast.error("Preencha todos os campos!", { style: ToastStyle })
        return;
    }
    
    const dataAtual = formatDate();
    const idServico = sessionStorage.getItem("jobId")
    
    formData = {...formData, dataHorarioInicio: dataAtual, dataHoraConclusao: null,  concluido: false, fkServico: idServico}
    await saveSubJob(formData)

}

const formatDate = () => {
    const dataAtual = new Date()
    console.log("data atual: " + dataAtual)

    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();
    const horaAtual = String(dataAtual.getHours()).padStart(2, '0');
    const minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0');
    
    const dataAtualFormatada = `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`
    console.log(dataAtualFormatada)

    return dataAtualFormatada;
}
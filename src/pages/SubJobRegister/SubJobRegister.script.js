import toast from "react-hot-toast"

export const registrarSubServico = async (formData, saveSubJob) => {
    if(formData.titulo == "" || formData.descricao == "" || formData.valor == NaN || formData.dataPrevista == "") {
        toast.error("Preencha todos os campos!")
        return;
    }
    
    const dataAtual = new Date()
    console.log("data atual: " + dataAtual)

    let dataAtualFormatada = null
    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();
    const horaAtual = String(dataAtual.getHours()).padStart(2, '0');
    const minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0');
    
    dataAtualFormatada = `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`
    console.log(dataAtualFormatada)

    const idServico = localStorage.getItem("jobId")
    
    formData = {...formData, dataHorarioInicio: dataAtualFormatada, dataHoraConclusao: null,  concluido: false, fkServico: idServico}
    await saveSubJob(formData)

}
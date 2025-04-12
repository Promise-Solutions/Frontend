import toast from "react-hot-toast"

export const registrarServico = async (formData, saveJob) => {
    if(formData.titulo == "" || formData.tipoServico == "" || formData.categoria == "") {
        toast.error("Preencha todos os campos!")
        return;
    }

    const userId = localStorage.getItem("userId")

    formData = {...formData, fkCliente: userId, concluido: false}

    await saveJob(formData)
}
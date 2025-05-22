import { axiosProvider } from "../../../provider/apiProvider"
import { showToast } from '../../../components/toastStyle/ToastStyle'

export const registrarDespesa = (formData) => {
    axiosProvider.post(`/products`, formData)
    .then((response) => (
        response.status
    ))
    .catch((error) => {
        showToast.error("Erro ao cadastrar despesa!");
        console.log("Erro ao cadastrar despesa", error)
    })
}
import { axiosProvider } from "../../../provider/apiProvider"
import { showToast } from '../../../components/toastStyle/ToastStyle'
import { ENDPOINTS } from "../../../constants/endpoints";

export const registrarDespesa = async (formData) => {
    try {
        const response = await axiosProvider.post(ENDPOINTS.EXPENSES, formData)
        return response.status;
    }catch(error) {
        showToast.error("Erro ao cadastrar despesa!");
        console.log("Erro ao cadastrar despesa", error)
    }
}
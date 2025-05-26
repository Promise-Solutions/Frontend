import { showToast } from "../../components/toastStyle/ToastStyle"
import { ENDPOINTS } from "../../constants/endpoints"
import { ROUTERS } from "../../constants/routers"
import { axiosProvider } from "../../provider/apiProvider"

export const deleteExpense = (id) => {
    axiosProvider.delete(ENDPOINTS.getExpenseById(id))
    .then((response) => {
        showToast.success("Despesa deletada com sucesso")
        return response.status;
    }).catch((error) => {
        showToast.error("Não foi possível deletar a despesa")
        console.log("Não foi possível deletar a despesa", error)
    })
}
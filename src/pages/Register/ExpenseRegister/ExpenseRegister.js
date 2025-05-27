import { axiosProvider } from "../../../provider/apiProvider"
import { showToast } from '../../../components/toastStyle/ToastStyle'

export const registrarDespesa = (formData) => {
    if(formData.expenseCategory === "STOCK" && isNaN(Number(formData.expenseDetail)))  {
        formData.expenseDetail = null;
    }

    if(
        !formData.date || formData.date == ""
        || !formData.expenseCategory || formData.expenseCategory == ""
        || !formData.expenseDetail || formData.expenseDetail == ""
        || !formData.paymentType || formData.paymentType == ""
        || !formData.amountExpend || formData.amountExpend === ""
        || (formData.expenseCategory === "STOCK" && formData.quantity === "")
    ) {
        showToast.error("Não são permitidos campos vazios!");
        return;
    }

    if(formData.expenseCategory === "STOCK" && formData.quantity == 0) {
        showToast.error("Não é permitido a quantidade ser 0!");
        return;
    }

    // axiosProvider.post(`/products`, formData)
    // .then((response) => (
    //     response.status
    // ))
    // .catch((error) => {
    //     showToast.error("Erro ao cadastrar despesa!");
    //     console.log("Erro ao cadastrar despesa", error)
    // })
}
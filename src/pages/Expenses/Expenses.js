import { showToast } from "../../components/toastStyle/ToastStyle"
import { ENDPOINTS } from "../../constants/endpoints"
import { axiosProvider } from "../../provider/apiProvider"

export const registrarDespesa = async (formData) => {
    try {
        const response = await axiosProvider.post(ENDPOINTS.EXPENSES, formData)
        return response.data;
    }catch(error) {
        showToast.error("Erro ao cadastrar despesa!");
        console.log("Erro ao cadastrar despesa", error)
        return null;
    }
}

export const deleteExpense = async (id) => {
    return await axiosProvider.delete(ENDPOINTS.getExpenseById(id))
    .then((response) => {
        showToast.success("Despesa deletada com sucesso")
        return response.status;
    }).catch((error) => {
        showToast.error("Não foi possível deletar a despesa")
        console.log("Não foi possível deletar a despesa", error)
        return null
    })
}

export const saveExpenseChanges = async (expenseDataUpdate, idExpense) => {
    if(!validateDataToSave(expenseDataUpdate) || !idExpense) return;

    const response = await axiosProvider.patch(ENDPOINTS.getExpenseById(idExpense), expenseDataUpdate)
        .then((res) => {
            showToast.success("Despesa atualizada com sucesso!")
            return res.data
        }
        )
        .catch((error) => {
            console.log("Erro ao atualizar despesa", error)
            showToast.error("Erro ao atualizar despesa!")
            return null;
        })

    return response;
}

export function validateDataToSave(expenseDataUpdate) {
    if(
        !expenseDataUpdate.date || expenseDataUpdate.date == ""
        || !expenseDataUpdate.expenseCategory || expenseDataUpdate.expenseCategory == ""
        || !expenseDataUpdate.description || expenseDataUpdate.description == ""
        || !expenseDataUpdate.paymentType || expenseDataUpdate.paymentType == ""
        || !expenseDataUpdate.amountSpend || expenseDataUpdate.amountSpend === ""
        || (expenseDataUpdate.expenseCategory === "STOCK" && (expenseDataUpdate.quantity === "" || !expenseDataUpdate.fkProduct))
    ) {
        showToast.error("Não são permitidos campos vazios!");
        return false;
    }

    if(expenseDataUpdate.expenseCategory === "STOCK" && expenseDataUpdate.quantity == 0) {
        showToast.error("Não é permitido a quantidade ser 0");
        return false;
    }

    return true;
}

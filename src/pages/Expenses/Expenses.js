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

export const saveExpenseChanges = (expenseDataUpdate, closeModal) => {
    if(expenseDataUpdate.expenseCategory === "STOCK" && isNaN(Number(expenseDataUpdate.description)))  {
        expenseDataUpdate.description = null;
    }

    if(
        !expenseDataUpdate.date || expenseDataUpdate.date == ""
        || !expenseDataUpdate.expenseCategory || expenseDataUpdate.expenseCategory == ""
        || !expenseDataUpdate.description || expenseDataUpdate.description == ""
        || !expenseDataUpdate.paymentType || expenseDataUpdate.paymentType == ""
        || !expenseDataUpdate.amountSpend || expenseDataUpdate.amountSpend === ""
        || (expenseDataUpdate.expenseCategory === "STOCK" && expenseDataUpdate.quantity === "")
    ) {
        showToast.error("Não são permitidos campos vazios!");
        return;
    }

    if(expenseDataUpdate.expenseCategory === "STOCK" && expenseDataUpdate.quantity == 0) {
        showToast.error("Não é permitido a quantidade ser 0!");
        return;
    }

    // axiosProvider.post(ENDPOINTS.EXPENSES, expenseDataUpdate)
    // .then((response) => {
    //     showToast.success("Despesa atualizada com sucesso!")
    //     closeModal();
    // })
    // .catch((error) => {
    //     showToast("Erro atualizar os dados da despesa")
    //     console.log("Erro atualizar os dados da despesa", error)
    // })

    console.log(expenseDataUpdate)
    alert("Alterações salvas")
    closeModal();
}
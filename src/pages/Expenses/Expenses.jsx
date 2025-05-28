import { useEffect, useState } from "react";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import { SyncLoader } from "react-spinners";
import ExpenseFilter from "../../components/filters/expenseFilter/ExpenseFilter";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";
import { axiosProvider } from "../../provider/apiProvider";
import Table from "../../components/tables/Table";
import ModalEditGoal from "../../components/modals/modalEditGoal/ModalEditGoal";
import DeleteButton from "../../components/buttons/deleteButton/DeleteButton";
import ModalConfirmDelete from "../../components/modals/modalConfirmDelete/ModalConfirmDelete";
import { deleteExpense, saveExpenseChanges } from "./Expenses";
import ModalEditExpense from "../../components/modals/modalEditExpense/ModalEditExpense";
import { showToast } from "../../components/toastStyle/ToastStyle";
import { ENDPOINTS } from "../../constants/endpoints";
import { formatDateWithoutTime } from "../../hooks/formatUtils";
import { getExpenseCategoryTranslated, getPaymentTypeTranslated } from "../../hooks/translateAttributes";

function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [expenseElements, setExpenseElements] = useState([]); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const navigate = useNavigate();
  const tableHeader = [
    { label:"Item", key: "description"},
    { label:"Categoria", key: "expenseCategory"},
    { label:"Valor", key: "amountSpend"},
    { label:"Data do pagamento", key: "date"},
    { label:"Quantidade", key: "quantity"},
    { label:"Forma de pagamento", key: "paymentType"},
    { label: "Ações", key: "actions"}
  ]

  useEffect(() => {
    function buscarDespesas() {
      axiosProvider.get(ENDPOINTS.EXPENSES)
        .then((response) => {
          setExpenseElements(
            response.data || []
          )
        })
        .catch((error) => {
          console.log("Erro ao buscar despesas", error)
        })
    }

    buscarDespesas();

    setIsLoading(false);
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleDelete = () => {
    const responseCode = deleteExpense(1)

    if(responseCode) {
      showToast.success("Despesa deletada com sucesso!")
      setIsDeleteModalOpen(false);
    } 
  }
  
    const filteredExpenseElements = expenseElements.filter((element) => {
      const visibleFields = [ 
        element.description,
        element.amountSpend,
        element.expenseCategory,
        element.quantity,
        element.paymentType,
        element.date
      ].map((field) =>
        String(field ?? "")
          .toUpperCase()
          .trim()
      );
      
    const term = searchTerm.toUpperCase().trim();

    return visibleFields.some((field) => field.includes(term));
  });
  return (
    <div className="slide-in-ltr min-w-full min-h-full text-white overflow-y-hidden">
      <ModalEditGoal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        goal={expenseElements.goal}
      />
      {
        isEditing ? (
          <ModalEditExpense 
            idExpense={1} 
            onClose={() => setIsEditing(false)} 
            onSave={saveExpenseChanges}
          />
        ) : (
          null
        ) 
      }
      <section className="mx-16 my-6">
        <div className="flex justify-center flex-col">
          <div className="flex w-full items-center gap-4 justify-between">
            <div>
              <h1 className="text-2xl font-thin">Gerencie suas despesas</h1>
            </div>
            <PrimaryButton
              id="goal_button"
              text="Gerenciar Meta"
              onClick={() => setIsGoalModalOpen(true)} // Passa navigate para a função stockRedirect
            />
          </div>
          <div className="flex justify-between mt-4 border-t-1 pt-4 border-gray-600">
            <div className="flex gap-2 justify-end w-full text-gray-400">
              <ExpenseFilter
                id="input_search_expense"
                placeholder="Busque uma Despesa"
                onSearch={handleSearch} // Passa a função de busca
              />
              <RegisterButton
                id="register_button"
                title="Cadastrar Usuário"
                text="+"
                onClick={() => navigate(ROUTERS.EXPENSE_REGISTER)}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center mt-[5rem]">
              <SyncLoader
                size={8}
                loading={true}
                color={"#02AEBA"}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
                {isLoading ? 
                  ( 
                    <SyncLoader
                      size={8}
                      loading={true}
                      color={"#02AEBA"}
                      speedMultiplier={2}
                    />
                  ) : (
                    <Table 
                      headers={tableHeader}
                      data={
                        filteredExpenseElements.map((expense) => ({
                          ...expense,
                        amountSpend: `R$ ${expense.amountSpend.toFixed(2).replace(".", ",")}`,
                         date: formatDateWithoutTime(expense.date),
                         expenseCategory: getExpenseCategoryTranslated(expense.expenseCategory),
                         paymentType: getPaymentTypeTranslated(expense.paymentType),
                         quantity: expense.quantity != null ? expense.quantity : "n/a" 
                        }))}
                      messageNotFound="Nenhuma despesa encontrada"
                    />
                    )
                  }
            </div>
          )}
        </div>
      </section>
      {
        isDeleteModalOpen ? (
          <ModalConfirmDelete
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDelete}
              title={"Deletar Despesa"}
              description={<span className="text-yellow-zero font-semibold">Tem certeza de que deseja deletar essa despesa? <br/> Não será possível recuperar!</span>}
          />
        ): (
          null
        )
      }
    </div>
  );
}

export default Expenses;

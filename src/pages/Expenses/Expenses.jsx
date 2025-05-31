import { useEffect, useState } from "react";
import RegisterButton from "../../components/buttons/action/RegisterButton";
import { SyncLoader } from "react-spinners";
import ExpenseFilter from "../../components/filters/ExpenseFilter"
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";
import { axiosProvider } from "../../provider/apiProvider";
import Table from "../../components/tables/Table";
import ModalEditGoal from "../../components/modals/edit/ModalEditGoal";
import DeleteButton from "../../components/buttons/action/DeleteButton";
import { deleteExpense, registrarDespesa, saveExpenseChanges, validateDataToSave } from "./Expenses.script";
import ModalConfirmDelete from "../../components/modals/ModalConfirmDelete";
import ModalEditExpense from "../../components/modals/edit/ModalEditExpense";
import { FaArrowRightLong } from "react-icons/fa6";
import { ENDPOINTS } from "../../constants/endpoints";
import { formatDateWithoutTime, getNumericValue } from "../../hooks/formatUtils";
import { getExpenseCategoryTranslated, getPaymentTypeTranslated } from "../../hooks/translateAttributes";
import EditButton from "../../components/buttons/action/EditButton";
import ModalAddExpense from "../../components/modals/add/ModalAddExpense";
import { showToast } from "../../components/toastStyle/ToastStyle";

function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [expenseElements, setExpenseElements] = useState([]); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [idExpenseToDelete, setIdExpenseToDelete] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const tableHeader = [
    { label:"Item", key: "description"},
    { label:"Categoria", key: "expenseCategory"},
    { label:"Valor (R$)", key: "amountSpend"},
    { label:"Data do pagamento", key: "date"},
    { label:"Quantidade", key: "quantity"},
    { label:"Forma de pagamento", key: "paymentType"},
    { label: "Ações", key: "actions"}
  ]

  useEffect(() => {
    async function buscarDespesas () {
      return await axiosProvider.get(ENDPOINTS.EXPENSES)
        .then((response) => {
          return  response.data || []
        })
        .catch((error) => {
          console.log("Erro ao buscar despesas", error)
          return []
        })
    }

    async function carregarDespesas() {
      const despesas = await buscarDespesas();

      setExpenseElements(despesas)
    }

    carregarDespesas();
    setIsLoading(false);
  }, [])

  const handleRegisterExpense = async (formData, productOptions) => {
        const formDataToSave = {
            ...formData,
            fkProduct: getNumericValue(formData.fkProduct),
            quantity: getNumericValue(formData.quantity),
            amountSpend: getNumericValue(formData.amountSpend)
        };
        if(formData.expenseCategory === "STOCK") {
            formDataToSave.description = productOptions.find(p => p.id === formData.fkProduct)?.name || formData.description;
        } else {
            formDataToSave.fkProduct = null
            formDataToSave.quantity = null
        }
      
        console.log(formDataToSave)
        if(!validateDataToSave(formDataToSave)) return;

        const response = await registrarDespesa(formDataToSave);
        if(response) {
            showToast.success("Despesa registrada com sucesso!")
            setIsAddModalOpen(false)
            handleExpenseRegistered(response, formData.quantity)
        }
    };

    const handleExpenseRegistered = (expenseRegistered) => {
      setExpenseElements((prev) => [
        ...prev,
        expenseRegistered
      ]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleDelete = (idExpense) => {
    setIdExpenseToDelete(idExpense)
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if(!idExpenseToDelete) return;

    const responseCode = await deleteExpense(idExpenseToDelete)

    if(responseCode) {
      setIsDeleteModalOpen(false);
      handleExpenseDeleted()
      setIdExpenseToDelete(null);
    } 
  }

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setIsEditing(true);
  } 

  const handleExpenseUpdated = (expenseUpdated, newQuantity) => {
    setExpenseElements((prev) =>
      prev.map((expense) =>
        expense.id === expenseUpdated.id ? {...expenseUpdated , quantity: newQuantity} : expense
      )
    );
  };

  const handleExpenseDeleted = () => {
    setExpenseElements((prev) =>
      prev.filter((expense) => expense.id !== idExpenseToDelete)
    );
  };

  const handleSaveGoal = (goal) => {
    axiosProvider.put(ENDPOINTS.GOAL, {goal})
      .then(() => {
        showToast.success("Meta atualizada com sucesso!")
        setIsGoalModalOpen(false);
      })
      .catch((error) => {
        showToast.error("Não foi possível atualizar a meta!")
        console.error("Não foi possível atualizar a meta", error)
      })
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
        onSave={handleSaveGoal}
      />
      <ModalEditExpense 
        isOpen={isEditing}
        initialData={expenseToEdit} 
        onClose={() => setIsEditing(false)} 
        onSave={saveExpenseChanges}
        onExpenseSaved={handleExpenseUpdated}
      />
      <ModalAddExpense
        isOpen={isAddModalOpen}
        onSave={handleRegisterExpense}
        onClose={() => setIsAddModalOpen(false)}
      />
      <section className="mx-16 my-6">
        <div className="flex justify-center flex-col">
          <div className="flex w-full items-center gap-4 justify-between">
            <div className="items-center">
              <h1 className="text-2xl font-thin">Gerencie suas despesas</h1>
              <p className="flex gap-4 items-center text-yellow-zero text-sm">
                Antes de adicionar uma despesa de categoria estoque, cadastre o produto
                <FaArrowRightLong />
                <span className="underline cursor-pointer" onClick={() => navigate(ROUTERS.BAR_STOCK)}>Aqui!</span>
              </p>
            </div>
            <PrimaryButton
              id="goal_button"
              text="Gerenciar Meta"
              onClick={() => setIsGoalModalOpen(true)}
            />
          </div>
          <div className="flex justify-between mt-4 border-t-1 pt-4 border-gray-600">
            <div className="flex gap-2 justify-end w-full text-gray-400">
              <ExpenseFilter
                id="input_search_expense"
                placeholder="Busque uma Despesa"
                onSearch={handleSearch}
              />
              <RegisterButton
                id="register_button"
                title="Cadastrar Usuário"
                text="+"
                onClick={() => setIsAddModalOpen(true)}
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
              <Table 
                headers={tableHeader}
                data={
                  filteredExpenseElements.map((expense) => ({
                    ...expense,
                    amountSpend: `R$ ${expense.amountSpend.toFixed(2).replace(".", ",")}`,
                    date: formatDateWithoutTime(expense.date),
                    expenseCategory: getExpenseCategoryTranslated(expense.expenseCategory),
                    paymentType: getPaymentTypeTranslated(expense.paymentType),
                    quantity: expense.quantity != null ? expense.quantity : <span className="text-gray-400">N/A</span>,
                    actions: [
                      <div className="flex gap-2">
                        <EditButton
                          id="id_edit"
                          text="Editar"
                          onClick={() => handleEditExpense(expense)}
                        />
                        <DeleteButton 
                          id="id_delete"
                          text="Deletar"
                          onClick={() => handleDelete(expense.id)}
                        />
                    </div>
                  ]
                  }))}
                messageNotFound="Nenhuma despesa encontrada"
              />
            </div>
          )}
        </div>
      </section>
      {
        isDeleteModalOpen ? (
          <ModalConfirmDelete
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
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

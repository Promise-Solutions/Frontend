import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/pagination.jsx";
import RegisterButton from "../../components/buttons/action/RegisterButton";
import { SyncLoader } from "react-spinners";
import ExpenseFilter from "../../components/filters/ExpenseFilter";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { axiosProvider } from "../../provider/apiProvider";
import Table from "../../components/tables/Table";
import ModalEditGoal from "../../components/modals/edit/ModalEditGoal";
import DeleteButton from "../../components/buttons/action/DeleteButton";
import {
  deleteExpense,
  registrarDespesa,
  validateDataToSave,
} from "./Expenses.script";
import ModalConfirmDelete from "../../components/modals/ModalConfirmDelete";
import { ENDPOINTS } from "../../constants/endpoints";
import {
  formatDateWithoutTime,
  getBRCurrency,
  getNumericValue,
} from "../../hooks/formatUtils";
import {
  getExpenseCategoryTranslated,
  getPaymentTypeTranslated,
} from "../../hooks/translateAttributes";
import ModalAddExpense from "../../components/modals/add/ModalAddExpense";
import { showToast } from "../../components/toastStyle/ToastStyle";

function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expenseElements, setExpenseElements] = useState([]);
  const [expensePage, setExpensePage] = useState(1);
  const [expenseTotalPages, setExpenseTotalPages] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idExpenseToDelete, setIdExpenseToDelete] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const tableHeader = [
    { label: "Item", key: "description" },
    { label: "Categoria", key: "expenseCategory" },
    { label: "Valor (R$)", key: "amountSpend" },
    { label: "Data do pagamento", key: "date" },
    { label: "Quantidade", key: "quantity" },
    { label: "Forma de pagamento", key: "paymentType" },
    { label: "Ações", key: "actions" },
  ];

  async function buscarDespesas() {
    return await axiosProvider
      .get(ENDPOINTS.EXPENSES)
      .then((response) => {
        return response.data || [];
      })
      .catch((error) => {
        console.log("Erro ao buscar despesas", error);
        return [];
      });
  }

  async function carregarDespesas() {
    const despesas = await buscarDespesas();

    setExpenseElements(despesas);
    setIsLoading(false);
  }

  async function getCurrentGoal() {
    await axiosProvider
      .get(ENDPOINTS.RECENT_GOAL)
      .then((response) => {
        setCurrentGoal(response.data.goal);
      })
      .catch((error) => {
        if (error.status == 404) {
          console.log("Meta ainda não cadastrada!");
        } else {
          console.error("Erro ao buscar meta atual", error);
        }
        setCurrentGoal(0);
      });
  }

  // Removido useEffect antigo duplicado
  useEffect(() => {
    async function fetchExpensesPaginated() {
      setIsLoading(true);
      try {
        const pageSize = 7;
        const response = await axiosProvider.get(
          `${ENDPOINTS.EXPENSES}?size=${pageSize}&page=${expensePage - 1}`
        );
        const data = response.data || {};
        setExpenseElements(data.content || []);
        setExpenseTotalPages(data.totalPages || 1);
      } catch (error) {
        console.log("Erro ao buscar despesas", error);
        setExpenseElements([]);
        setExpenseTotalPages(1);
      }
      setIsLoading(false);
    }
    async function getCurrentGoal() {
      await axiosProvider
        .get(ENDPOINTS.RECENT_GOAL)
        .then((response) => {
          setCurrentGoal(response.data.goal);
        })
        .catch((error) => {
          if (error.status == 404) {
            console.log("Meta ainda não cadastrada!");
          } else {
            console.error("Erro ao buscar meta atual", error);
          }
          setCurrentGoal(0);
        });
    }
    fetchExpensesPaginated();
    getCurrentGoal();
  }, [expensePage]);

  const handleRegisterExpense = async (formData, productOptions) => {
    const formDataToSave = {
      ...formData,
      fkProduct: getNumericValue(formData.fkProduct),
      quantity: getNumericValue(formData.quantity),
      amountSpend: getNumericValue(formData.amountSpend),
    };

    if (formData.expenseCategory === "STOCK") {
      console.log("if");
      formDataToSave.description =
        productOptions.find((p) => p.id === formDataToSave.fkProduct)?.name ||
        formData.description;
      console.log("description", formDataToSave.description);
    } else {
      formDataToSave.fkProduct = null;
      formDataToSave.quantity = null;
    }
    console.log(productOptions);
    console.log(formDataToSave);
    if (!validateDataToSave(formDataToSave)) return;

    const response = await registrarDespesa(formDataToSave);
    if (response) {
      showToast.success("Despesa registrada com sucesso!");
      setIsAddModalOpen(false);
      handleExpenseRegistered(response, formData.quantity);
    }
    console.log(formDataToSave);
  };

  const handleExpenseRegistered = (expenseRegistered) => {
    setExpenseElements((prev) => [...prev, expenseRegistered]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const handleDelete = (idExpense) => {
    setIdExpenseToDelete(idExpense);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idExpenseToDelete) return;

    const responseCode = await deleteExpense(idExpenseToDelete);

    if (responseCode) {
      setIsDeleteModalOpen(false);
      handleExpenseDeleted();
      setIdExpenseToDelete(null);
    }
  };

  const handleExpenseDeleted = () => {
    setExpenseElements((prev) =>
      prev.filter((expense) => expense.id !== idExpenseToDelete)
    );
  };

  const handleSaveGoal = async (goal) => {
    axiosProvider.get(ENDPOINTS.RECENT_GOAL).then((res) => {
      console.log(res.data.id);
      if (res.data == null || res.data == "" || res.data == undefined) {
        axiosProvider
          .post(ENDPOINTS.GOALS, {
            goal: goal,
          })
          .then((response) => {
            showToast.success("Meta atualizada com sucesso!");
            setIsGoalModalOpen(false);
            return response.data;
          })
          .catch((error) => {
            showToast.error("Não foi possível atualizar a meta!");
            console.error("Não foi possível atualizar a meta", error);
            return null;
          });
      } else if (res.data != null || res.data != "" || res.data != undefined) {
        axiosProvider
          .put(ENDPOINTS.GOALS, {
            id: res.data.id,
            goal: goal,
          })
          .then((response) => {
            showToast.success("Meta atualizada com sucesso!");
            setIsGoalModalOpen(false);
            return response.data;
          })
          .catch((error) => {
            showToast.error("Não foi possível atualizar a meta!");
            console.error("Não foi possível atualizar a meta", error);
            return null;
          });
      }
    });
  };

  const filteredExpenseElements = expenseElements.filter((element) => {
    const visibleFields = [
      element.description,
      element.amountSpend,
      element.expenseCategory,
      element.quantity,
      element.paymentType,
      element.date,
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
        onGoalSaved={setCurrentGoal}
        currentGoal={currentGoal}
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
            </div>
            <div className="flex items-end gap-2">
              <span className="text-yellow-zero font-semibold text-[13px]">
                Meta Atual: {getBRCurrency(currentGoal)}
              </span>
              <PrimaryButton
                id="goal_button"
                text="Gerenciar Meta"
                onClick={() => setIsGoalModalOpen(true)}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between text-gray-400 border-t-1 border-gray-600 pt-4 mt-7 w-full">
            <Pagination
              page={expensePage}
              totalPages={expenseTotalPages}
              onPageChange={setExpensePage}
            />
            <div className="flex row justify-between gap-4">
              <ExpenseFilter
                id="input_search_expense"
                placeholder="Busque uma Despesa"
                onSearch={handleSearch}
              />
              <RegisterButton
                id="register_button"
                title="Cadastrar Despesa"
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
                data={expenseElements.map((expense) => ({
                  ...expense,
                  amountSpend: getBRCurrency(expense.amountSpend),
                  date: formatDateWithoutTime(expense.date),
                  expenseCategory: getExpenseCategoryTranslated(
                    expense.expenseCategory
                  ),
                  paymentType: getPaymentTypeTranslated(expense.paymentType),
                  quantity:
                    expense.quantity != null ? (
                      expense.quantity
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    ),
                  actions: [
                    <div className="flex gap-2">
                      <DeleteButton
                        id="id_delete"
                        text="Deletar"
                        onClick={() => handleDelete(expense.id)}
                      />
                    </div>,
                  ],
                }))}
                messageNotFound="Nenhuma despesa encontrada"
              />
            </div>
          )}
        </div>
      </section>
      {isDeleteModalOpen && (
        <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Deletar Despesa"
          description={
            <span className="text-yellow-zero font-semibold">
              Tem certeza de que deseja deletar essa despesa? <br /> Não será
              possível recuperar!
            </span>
          }
        />
      )}
    </div>
  );
}

export default Expenses;

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

function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [expenseElements, setExpenseElements] = useState([]); 
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const navigate = useNavigate();
  const tableHeader = [
    { label:"Item", key: "expenseDetail"},
    { label:"Categoria", key: "expenseCategory"},
    { label:"Valor", key: "amountExpend"},
    { label:"Data do pagamento", key: "date"},
    { label:"Quantidade", key: "quantity"},
    { label:"Forma de pagamento", key: "paymentType"}
  ]

  const mockTableData = [
    {
    expenseDetail: "Compra de materiais de escritório",
    expenseCategory: "Suprimentos",
    amountExpend: 250.75,
    date: "2025-05-15",
    quantity: 10,
    paymentType: "Cartão de crédito"
  },
  {
    expenseDetail: "Almoço com cliente",
    expenseCategory: "Refeição",
    amountExpend: 89.90,
    date: "2025-05-14",
    quantity: 1,
    paymentType: "Dinheiro"
  },
  {
    expenseDetail: "Assinatura de software",
    expenseCategory: "Serviços",
    amountExpend: 129.99,
    date: "2025-05-01",
    quantity: 1,
    paymentType: "Débito automático"
  },
  {
    expenseDetail: "Transporte para reunião",
    expenseCategory: "Transporte",
    amountExpend: 45.00,
    date: "2025-05-10",
    quantity: 1,
    paymentType: "Cartão de débito"
  }
  ]

  useEffect(() => {
    // function buscarDespesas() {
    //   axiosProvider.get("/expenses")
    //     .then((response) => {
    //       setExpenseElements(
    //         response.data
    //       )
    //     .catch((error) => {
    //       console.log("Erro ao buscar despesas", error)
    //       return [];
    //     })
    //     })
    // }

    // buscarDespesas();

    setIsLoading(false);
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  
    const filteredExpenseElements = expenseElements.filter((element) => {
      const visibleFields = [ 
        element.props.expenseDetail,
        element.props.amountExpend,
        element.props.expenseCategory,
        element.props.quantity,
        element.props.paymentType,
        element.props.date
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
                      data={mockTableData}
                      // data={
                      //   filteredExpenseElements.map((expense) => ({
                      //     ...expense,
                      //     amountExpend: `R$ ${expense.amountExpend.toFixed(2).replace(".", ",")}`
                      //    date: formatDateWithoutTime(expense.date)
                      //    expenseCategory: getExpenseCategoryTranslated(expense.expenseCategory)
                      //    paymentType: getPaymentTypeTranslated(expense.paymentType)
                      //    quantity: expense.quantity? : "n/a" 
                      //   }))}
                      messageNotFound="Nenhuma despesa encontrada"
                    />
                    )
                  }
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Expenses;

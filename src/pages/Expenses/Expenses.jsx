import { useState } from "react";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import { SyncLoader } from "react-spinners";
import ExpenseFilter from "../../components/filters/expenseFilter/ExpenseFilter";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";

function Expenses() {

// ! Tem que fazer a requisição para pegar as despesas e os modais para adicionar e editar

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [expenseElements, setExpenseElements] = useState([]); // Estado para armazenar os elementos renderizados
  
  const goalModal = () => {
    //deve abrir o modal de metas
    alert("abrindo modal de metas");
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  const noResultsMessage =
    searchTerm && filteredExpenseElements.length === 0 ? (
      <p className="text-center text-gray-400">
        Nenhum resultado encontrado para "{searchTerm}".
      </p>
    ) : null;
  
    const filteredExpenseElements = expenseElements.filter((element) => {
      const visibleFields = [
        // coloque os campos que aparecerem no card aqui

        //exemplo:
        element.props.title,
        
      ].map((field) =>
        String(field ?? "")
          .toUpperCase()
          .trim()
      );

      const term = searchTerm.toUpperCase().trim();

      return visibleFields.some((field) => field.includes(term));
    });
  return (
    <div className="min-w-full min-h-full text-white overflow-y-hidden">
      <section className="mx-16 my-6">
        <div className="flex justify-center flex-col">
          <div className="flex w-full items-center gap-4 justify-between">
            <div>
              <h1 className="text-2xl font-thin">Gerencie suas Despesas</h1>
            </div>
            <PrimaryButton
              id="goal_button"
              text="Gerenciar Meta"
              onClick={() => goalModal()} // Passa navigate para a função stockRedirect
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
                onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
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
                {filteredCommandElements.length > 0
                  ? filteredCommandElements // Renderiza os elementos filtrados
                  : noResultsMessage}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Expenses;

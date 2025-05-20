import { useState } from "react";
import RegisterButton from "../../components/buttons/registerButton/RegisterButton";
import { SyncLoader } from "react-spinners";
import ExpenseFilter from "../../components/filters/expenseFilter/ExpenseFilter";

function Expenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  const handleSearch = (term) => {
    setSearchTerm(term.toUpperCase().trim());
  };

  return (
    <div className="min-w-full min-h-full text-white overflow-y-hidden">
      <section className="mx-16 my-6">
        <div className="flex justify-center flex-col">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-thin">Gerencie suas Despesas</h1>
            </div>
            <div className="flex gap-2 justify-end text-gray-400">
              {/* Campo de busca de despesas */}
              <ExpenseFilter
                id="input_search_expense"
                placeholder="Busque uma Despesa"
                onSearch={handleSearch} // Passa a função de busca
              />
              {/* Botão para cadastrar um novo usuário */}
              <RegisterButton
                id="register_button"
                title="Cadastrar Usuário"
                text="+"
                onClick={() => registerRedirect(navigate)} // Pass navigate to registerRedirect
              />
            </div>
          </div>
          {/* Espaço reservado para os cards de usuários */}
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full mt-[5rem]">
              <SyncLoader
                size={8}
                loading={true}
                color={"#02AEBA"}
                speedMultiplier={2}
              />
            </div>
          ) : (
            <div className="gap-2 flex flex-wrap justify-center mt-6 max-h-[500px] 2xl:max-h-[670px] overflow-y-auto w-full h-auto">
              texto de não encontrado
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Expenses;

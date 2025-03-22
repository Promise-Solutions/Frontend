// Importa os componentes necessários
import UserFilter from "../../components/userFilter/userFilter";
import UserTypeFilter from "../../components/userTypeFilter/userTypeFilter";
import PrimaryButton from "../../components/primaryButton/primaryButton";

// Componente funcional para a página de gerenciamento de usuários
const Users = () => {
  return (
    <div className="min-w-full min-h-full text-white">
      {/* Seção de cabeçalho com título e botão */}
      <section className="flex justify-center items-center mt-28">
        <div className="mr-10">
          <h1 className="text-[42px] font-bold">Gerencie seus usuários</h1>
          <p className="text-[18px] mb-4">
            Tenha uma visão geral de todos seus clientes cadastrados
          </p>
        </div>
        {/* Botão para cadastrar um novo usuário */}
        <PrimaryButton text="Cadastrar Usuário" />
      </section>

      {/* Seção principal com filtros e cards */}
      <section className="px-16 mt-16">
        {/* Filtro de busca de usuários */}
        <div className="flex">
          <UserFilter placeholder="Busque um Usuário" />
        </div>

        {/* Filtros por tipo de usuário e exibição de cards */}
        <div className="flex justify-center flex-col mt-4">
          {/* Filtro por tipo de usuário (Clientes ou Internos) */}
          <UserTypeFilter />
          {/* Espaço reservado para os cards de usuários */}
          <div className="flex flex-wrap justify-center gap-4">Cards</div>
        </div>
      </section>
    </div>
  );
};

// Exporta o componente para ser usado em outras partes do projeto
export default Users;

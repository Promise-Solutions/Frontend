import UserFilter from "../../components/userFilter/userFilter";
import UserTypeFilter from "../../components/userTypeFilter/userTypeFilter";

const Users = () => {
  return (
    <div className="min-w-full min-h-full text-white">
      <section className="flex justify-center items-center">
        <div>
          <h1>Gerencie seus usuários</h1>
          <p>Tenha uma visão geral de todos seus clientes cadastrados</p>
        </div>
        {/* Componente o botão */}
        <button>Cadastrar Usuário</button>
      </section>
      <section className="px-16">
        <div className="flex">
          <UserFilter placeholder="Busque um Usuário" />
        </div>
        <div className="flex justify-center flex-col">
          <UserTypeFilter />
          {/* Componente de cards */}
          <div className="flex flex-wrap justify-center gap-4">
            Cards
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;

import Input from "../../components/form/Input";
import Button from "../../components/form/SubmitButton";

const Reset = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <h1 className="text-2xl font-light mb-2 text-white">
        Insira a nova senha
      </h1>
      <div className="w-96 border-1 border-pink-zero p-12 rounded-lg shadow-lg">
        <p className="text-yellow-zero mb-4">
          Por favor, insira sua nova senha.
        </p>
        <div className="flex justify-between flex-col gap-6">
          <Input
            type="password"
            text="Nova Senha"
            placeholder="Digite sua nova senha"
            className="mt-4"
          />
          <Input
            type="password"
            text="Confirmação da Nova Senha"
            placeholder="Confirme sua nova senha"
            className="mt-4"
          />
          <Button text="Redefinir Senha" className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Reset;

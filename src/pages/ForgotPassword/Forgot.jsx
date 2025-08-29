import Input from "../../components/form/Input";
import Button from "../../components/form/SubmitButton";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <h1 className="text-2xl font-light mb-2 text-white">Esqueceu a senha?</h1>
      <div className="w-96 border-1 border-pink-zero p-12 rounded-lg shadow-lg">
        <p className="text-yellow-zero mb-4">
          Por favor, insira seu e-mail para redefinir sua senha.
        </p>
        <div className="flex justify-between flex-col gap-6">
          <Input
            type="email"
            text="E-mail"
            placeholder="Digite seu e-mail"
            className="mt-4"
          />
          <Button text="Enviar Código" className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

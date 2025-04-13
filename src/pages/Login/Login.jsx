import { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import { ToastStyle } from "../../components/toastStyle/ToastStyle";
import { useNavigate } from "react-router-dom";
import { axiosProvider } from "../../provider/apiProvider";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("O campo de email está vazio.", { style: ToastStyle });
      return;
    }

    if (!formData.senha.trim()) {
      toast.error("O campo de senha está vazio.", { style: ToastStyle });
      return;
    }

    toast.promise(
      axiosProvider.get("/employees").then((response) => {
        const users = response.data;
        const foundUser = users.find(
          (foundUser) =>
            foundUser.email === formData.email &&
            foundUser.password === formData.password
        );

        if (foundUser) {
          localStorage.setItem("token", foundUser.token);
          navigate("/home");
        } else {
          throw new Error("Credenciais inválidas.");
        }
      }),
      {
        loading: "Autenticando...",
        success: "Usuário autenticado com sucesso!",
        error: "Erro ao autenticar. Verifique suas credenciais.",
      },
      { style: ToastStyle }
    );
  };

  return (
    <div className="container text-white min-w-screen min-h-screen flex items-center justify-center">
      <div
        className="box border border-solid border-[#9A3379] flex justify-center items-center flex-col pb-32 pt-4 px-28"
        style={{ boxShadow: "4px 4px 10px rgba(154, 51, 121, 0.3)" }}
      >
        <h1
          className="text-[42px] text-transparent font-bold"
          style={{ WebkitTextStroke: "2px cyan" }}
        >
          LOGIN
        </h1>
        <form className="flex flex-col gap-6 mt-20" onSubmit={handleSubmit}>
          <Input
            type="email"
            text="E-mail"
            name="email"
            placeholder="Digite o e-mail"
            maxLength="50"
            handleOnChange={handleInputChange}
            value={formData.email}
          />
          <Input
            type="password"
            text="Senha"
            name="senha"
            placeholder="Digite sua senha"
            handleOnChange={handleInputChange}
            value={formData.password}
          />
          <SubmitButton text="Confirmar" />
        </form>
      </div>
    </div>
  );
};

export default Login;

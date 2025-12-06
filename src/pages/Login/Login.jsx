import { useState } from "react";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import { showToast, ToastStyle } from "../../components/toastStyle/ToastStyle";
import { useNavigate } from "react-router-dom";
import { axiosProvider } from "../../provider/apiProvider";
import { ROUTERS } from "../../constants/routers";
import { ENDPOINTS } from "../../constants/endpoints";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      showToast.error("O campo de email está vazio.");
      return;
    }

    if (!formData.password.trim()) {
      showToast.error("O campo de senha está vazio.");
      return;
    }

    const tokenExists = localStorage.getItem("token") !== null;

    if(tokenExists) {
      localStorage.removeItem("token");
    }

    try {
      showToast.loading("Autenticando...");

      const response = await axiosProvider.post(
          ENDPOINTS.EMPLOYEES_LOGIN,
          { 
            email: formData.email, 
            password: formData.password
          }
      );

      const { token, id } =  response?.data || {};

       if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userLogged", id);
          showToast.dismiss()
          showToast.success("Usuário autenticado com sucesso!")
          navigate(ROUTERS.HOME_ALIAS); 
        } else {
          throw new Error("Token não recebido.");
        }

    } catch (error) {
      console.log(error);
      showToast.dismiss();
      showToast.error("Erro ao autenticar. Verifique suas credenciais.")
    }
  }

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
            name="password"
            placeholder="Digite sua senha"
            handleOnChange={handleInputChange}
            value={formData.password}
          />
          <SubmitButton text="Confirmar" />
          <p className="text-center text-gray-400 cursor-pointer hover:underline" onClick={() => navigate(ROUTERS.FORGOT)}>
            Esqueceu sua senha?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import SecondaryButton from "../../components/buttons/SecondaryButton";
import Input from "../../components/form/Input";
import { useState, useEffect } from "react";
import { getParams } from "../../hooks/getParams";
import { showToast } from "../../components/toastStyle/ToastStyle";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../constants/routers";
import { axiosProvider } from "../../provider/apiProvider";
import { ENDPOINTS } from "../../constants/endpoints";

const ResetPassword = () => {
  const [tokenValue, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  useEffect(() => {
    const params = getParams();
    setToken(params.token);
  }, []);

  function reset() {
    if (password != confirmPassword) {
      showToast.error("As senhas não correspondem!");
    } else if (tokenValue == null) {
      showToast.error("Token inválido!");
    } else if (password == "" || confirmPassword == "") {
      showToast.error("Preencha todos os campos");
    } else {
      axiosProvider
        .post(ENDPOINTS.RESET_PASSWORD, {
          token: tokenValue,
          newPassword: password,
        })
        .then((res) => {
          if (res.status === 200) {
            showToast.success("Senha alterada com sucesso! Redirecionando...");
            setTimeout(() => {
              navigate(ROUTERS.LOGIN);
            }, 1500);
          }
        })
        .catch((error) => {
          if (error.response.data.type == "BAD_REQUEST") {
            showToast.error("Erro Interno: Informações errôneas.");
          } else {
            showToast.error("Token inválido!");
          }
        });
    }
  }

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
            handleOnChange={(e) => handlePasswordChange(e)}
          />
          <Input
            type="password"
            text="Confirmação da Nova Senha"
            placeholder="Confirme sua nova senha"
            className="mt-4"
            handleOnChange={(e) => handleConfirmPasswordChange(e)}
          />
          <SecondaryButton
            text="Redefinir Senha"
            className="mt-4"
            onClick={reset}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

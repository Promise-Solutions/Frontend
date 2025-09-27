import { useState } from "react";
import Input from "../../components/form/Input";
import { ENDPOINTS } from "../../constants/endpoints";
import { axiosProvider } from "../../provider/apiProvider";
import { showToast } from "../../components/toastStyle/ToastStyle";
import ReturnButton from "../../components/buttons/action/ReturnButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const ForgotPassword = () => {

  const [ emailValue, setEmailValue ] = useState("");
  const [ mensagemRetorno, setMensagemRetorno ] = useState("");
  const [ emailValido, setEmailValido ] = useState(true);


  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmailValue(value);
  }

  const envioEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(emailValue)) {
      showToast.error("Insira um email válido");
      setEmailValido(false);
      return;
    }

    showToast.loading("Carregando...")

    axiosProvider.post(ENDPOINTS.FORGOT_PASSWORD, 
      {
        email: emailValue
      } )
    .then((res) => {
      const mensagem = res.data;
      setEmailValido(true);
      setMensagemRetorno("Enviamos em seu email instruções para redefinir sua senha.");
    })
    .catch((error) => {
      setEmailValido(false);
      console.log(error)
      if(error.response.data.type == "BAD_REQUEST") {
        setMensagemRetorno(error.response.data.message)
      } else {
        setMensagemRetorno("Erro ao enviar e-mail");
      }
    })
    .finally(() => {
      showToast.dismiss();
    })
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
      <div className="relative flex justify-center w-96">
      <div className="absolute top-2.5 left-2">
        <ReturnButton tamanho='20px'/>
      </div>
        <h1 className="text-2xl font-light mb-2 text-white">Esqueceu a senha?</h1>

      </div>
      <div className="w-96 border-1 border-pink-zero px-8 pb-6 pt-14 h-auto rounded-lg shadow-lg">
        <p className="text-yellow-zero mb-2">
          Por favor, insira seu e-mail para redefinir sua senha.
        </p>
        <div className="flex justify-between flex-col h-auto gap-6">
          <Input
            type="email"
            text="E-mail"
            handleOnChange={(e) => handleInputChange(e)}
            value={emailValue}
            placeholder="Digite seu e-mail"
            className="mt-4"
          />
          <SecondaryButton onClick={envioEmail} text="Enviar Código" className="mt-4" />
        </div> 
        <p className={`h-10 text-[12px] text-center mt-2 font-semibold tracking-widest
          ${emailValido ?  ` text-yellow-zero` : `text-red-zero`}
          `}>{mensagemRetorno}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;

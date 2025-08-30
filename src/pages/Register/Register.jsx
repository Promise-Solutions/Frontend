import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosProvider } from "../../provider/apiProvider.js";
import {
  showToast,
  ToastStyle,
} from "../../components/toastStyle/ToastStyle.jsx";
import { ROUTERS } from "../../constants/routers.js";
import Input from "../../components/form/Input.jsx";
import SubmitButton from "../../components/form/SubmitButton.jsx";
import logo from "../../assets/logo-branco-bg-sonoro.png";
import SelectTypeUser from "../../components/form/SelectTypeUser.jsx";
import Select from "../../components/form/Select.jsx";
import { ENDPOINTS } from "../../constants/endpoints.js";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    contato: "",
    tipoCliente: "",
    tipo: "",
    dataNascimento: "",
    senha: "",
  });

  const type = [
    { id: "CLIENTE", name: "Cliente" },
    { id: "FUNCIONARIO", name: "Funcionário" },
  ];

  const clienteOptions = [
    { id: "AVULSO", name: "Avulso" },
    { id: "MENSAL", name: "Mensal" },
  ];

  const [selectedType, setSelectedType] = useState("CLIENTE");

  // Máscara de CPF
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
    if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
    if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
    setFormData((prev) => ({ ...prev, cpf: value }));
  };

  // Máscara de contato
  const handleContatoChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (value.length > 0) value = "(" + value;
    if (value.length > 3) value = value.slice(0, 3) + ") " + value.slice(3);
    if (value.length > 10) value = value.slice(0, 10) + "-" + value.slice(10);
    setFormData((prev) => ({ ...prev, contato: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipo") setSelectedType(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validação de email
  const validarEmail = (email) => {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (!email.trim()) {
      showToast.error("O campo de email está vazio.");
      return false;
    }
    if (!regex.test(email)) {
      showToast.error("O email inserido é inválido.");
      return false;
    }
    return true;
  };

  // Validação de campos
  const validarCampos = () => {
    if (!formData.nome.trim()) {
      showToast.error("O campo de nome está vazio.");
      return false;
    }
    if (formData.cpf.length !== 14) {
      showToast.error("O CPF deve ter 14 caracteres.");
      return false;
    }
    if (!validarEmail(formData.email)) {
      return false;
    }
    if (formData.contato.length !== 15) {
      showToast.error("O contato deve ter 15 caracteres.");
      return false;
    }
    if (selectedType === "CLIENTE") {
      if (!formData.tipoCliente.trim()) {
        showToast.error("O campo de tipo de cliente está vazio.", {
          style: ToastStyle,
        });
        return false;
      }
      if (!formData.dataNascimento) {
        showToast.error("O campo de data de nascimento está vazio.", {
          style: ToastStyle,
        });
        return false;
      }
    } else if (selectedType === "FUNCIONARIO") {
      if (!formData.senha || formData.senha.length < 8) {
        showToast.error("A senha deve ter pelo menos 8 caracteres.", {
          style: ToastStyle,
        });
        return false;
      }
    } else {
      showToast.error("Tipo de usuário inválido.");
      return false;
    }
    return true;
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    let novoUsuario;
    let endpoint;

    if (selectedType === "CLIENTE") {
      novoUsuario = {
        name: formData.nome.toUpperCase(),
        cpf: formData.cpf,
        email: formData.email,
        contact: formData.contato,
        clientType: formData.tipoCliente === "AVULSO" ? "SINGLE" : "MONTHLY",
        active: true,
        birthDay: formData.dataNascimento,
        createdDate: new Date().toISOString(),
      };
      endpoint = ENDPOINTS.CLIENTS
    } else if (selectedType === "FUNCIONARIO") {
      novoUsuario = {
        name: formData.nome.toUpperCase(),
        cpf: formData.cpf,
        email: formData.email,
        contact: formData.contato,
        password: formData.senha,
        active: true,
      };
      endpoint = ENDPOINTS.EMPLOYEES
    }

    console.log(novoUsuario)

    try {
      console.log("Novo usuário:", novoUsuario);
      const res = await axiosProvider.post(endpoint, novoUsuario);
      if (res.status === 201) {
        showToast.success("Cadastro realizado com sucesso!");
        setFormData({
          nome: "",
          cpf: "",
          email: "",
          contato: "",
          tipoCliente: "",
          tipo: "",
          senha: "",
        });
        navigate(ROUTERS.USERS);
      } else {
        showToast.error("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      const responseCode = error.status;

      if(responseCode === 409) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("Erro ao cadastrar usuário.");
      }
    }
  };

  return (
    <main className="slide-in-ltr flex items-center justify-center h-[600px] my-6 w-full px-16">
      <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
        <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
        <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
          Registre um novo usuário
        </h1>
      </section>
      <form
        autoComplete="off"
        className="flex flex-col items-center gap-3 w-full  px-4"
        onSubmit={handleSubmit}
      >
        <SelectTypeUser
          text="Tipo de usuário"
          name="tipo"
          options={type}
          handleOnChange={handleInputChange}
          value={formData.tipo}
        />
        {selectedType === "CLIENTE" && (
          <section
            id="form_cliente"
            className="flex flex-wrap items-center justify-between w-full gap-4"
          >
            <Input
              type="text"
              text="Nome"
              name="nome"
              required
              placeholder="Digite o nome"
              handleOnChange={handleInputChange}
              value={formData.nome}
              maxLength="50"
              id="nome"
            />
            <Input
              type="email"
              text="E-mail"
              name="email"
              required
              placeholder="Digite o e-mail"
              handleOnChange={handleInputChange}
              value={formData.email}
              maxLength="50"
              id="email"
            />
            <Input
              type="text"
              text="CPF"
              name="cpf"
              required
              placeholder="Digite o CPF"
              handleOnChange={handleCpfChange}
              value={formData.cpf}
              maxLength="14"
              id="cpf"
            />
            <Input
              type="text"
              text="Contato"
              name="contato"
              required
              placeholder="Digite o contato"
              handleOnChange={handleContatoChange}
              value={formData.contato}
              maxLength="15"
              id="contato"
            />
            <Input
              type="date"
              text="Data de Nascimento"
              name="dataNascimento"
              required
              placeholder="Digite o valor"
              handleOnChange={handleInputChange}
              value={formData.date}
              min="1900-12-31"
              max={new Date().toLocaleDateString("en-CA")}
              className="custom-calendar"
            />
            <Select
              text="Tipo de Cliente"
              name="tipoCliente"
              required
              options={clienteOptions}
              handleOnChange={handleInputChange}
              value={formData.tipoCliente}
              id="tipoCliente"
            />
          </section>
        )}
        {selectedType === "FUNCIONARIO" && (
          <section
            id="form_funcionario"
            className="flex flex-wrap items-center justify-between w-full gap-4"
          >
            <Input
              type="text"
              text="Nome"
              name="nome"
              required
              placeholder="Digite o nome"
              handleOnChange={handleInputChange}
              value={formData.nome}
              maxLength="50"
              id="nome"
            />
            <Input
              type="email"
              text="E-mail"
              name="email"
              required
              placeholder="Digite o e-mail"
              handleOnChange={handleInputChange}
              value={formData.email}
              maxLength="50"
              id="email"
            />
            <Input
              type="text"
              text="CPF"
              name="cpf"
              required
              placeholder="Digite o CPF"
              handleOnChange={handleCpfChange}
              value={formData.cpf}
              maxLength="14"
              id="cpf"
            />
            <Input
              type="text"
              text="Contato"
              name="contato"
              required
              placeholder="Digite o contato"
              handleOnChange={handleContatoChange}
              value={formData.contato}
              maxLength="15"
              id="contato"
            />
            <Input
              type="password"
              text="Senha"
              name="senha"
              required
              placeholder="Digite sua senha"
              handleOnChange={handleInputChange}
              value={formData.senha}
              id="senha"
            />
          </section>
        )}
        <SubmitButton id="btn_form" text="Confirmar" />
      </form>
    </main>
  );
}

export default Register;

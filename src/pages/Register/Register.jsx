import { useEffect, useState } from "react";
import { setupRegisterEvents } from "./Register.script.js";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import logo from "../../assets/logo-branco-bg-sonoro.png";
import SelectTypeUser from "../../components/Form/SelectTypeUser.jsx";
import Select from "../../components/form/Select.jsx";

function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipoCliente: "",
    tipo: "",
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

  const [selectedType, setSelectedType] = useState("CLIENTE"); // Default to "Cliente"

  useEffect(() => {
    const cleanup = setupRegisterEvents();
    return cleanup;
  }, []);

  useEffect(() => {
    setupRegisterEvents(); // Reaplicar eventos e máscaras após alteração do formulário
  }, [selectedType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "tipo") setSelectedType(value); // Update selectedType when user type changes
  };

  return (
    <main className="flex items-center justify-center h-[600px] my-6 w-full px-16">
      <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
        <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
        <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
          Registre um novo usuário
        </h1>
      </section>
      <form
        autoComplete="off"
        className="flex flex-col items-center gap-10 w-full h-full px-4"
      >
        <SelectTypeUser
          text="Tipo de usuário"
          name="tipo"
          options={type}
          handleOnChange={(e) => handleInputChange(e)}
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
              placeholder="Digite o nome"
              handleOnChange={handleInputChange}
              value={formData.nome}
              maxLength="50"
            />
            <Input
              type="email"
              text="E-mail"
              name="email"
              placeholder="Digite o e-mail"
              handleOnChange={handleInputChange}
              value={formData.email}
              maxLength="50"
            />
            <Input
              type="text"
              text="CPF"
              name="cpf"
              placeholder="Digite o CPF"
              handleOnChange={handleInputChange}
              value={formData.cpf}
              maxLength="14"
            />
            <Input
              type="text"
              text="Telefone"
              name="telefone"
              placeholder="Digite o telefone"
              handleOnChange={handleInputChange}
              value={formData.telefone}
              maxLength="15"
            />
            <Select
              text="Tipo de Cliente"
              name="tipoCliente"
              options={clienteOptions}
              handleOnChange={handleInputChange}
              value={formData.tipoCliente}
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
              placeholder="Digite o nome"
              handleOnChange={handleInputChange}
              value={formData.nome}
              maxLength="50"
            />
            <Input
              type="email"
              text="E-mail"
              name="email"
              placeholder="Digite o e-mail"
              handleOnChange={handleInputChange}
              value={formData.email}
              maxLength="50"
            />
            <Input
              type="text"
              text="CPF"
              name="cpf"
              placeholder="Digite o CPF"
              handleOnChange={handleInputChange}
              value={formData.cpf}
              maxLength="14"
            />
            <Input
              type="text"
              text="Telefone"
              name="telefone"
              placeholder="Digite o telefone"
              handleOnChange={handleInputChange}
              value={formData.telefone}
              maxLength="15"
            />
            <Input
              type="password"
              text="Senha"
              name="senha"
              placeholder="Digite sua senha"
              handleOnChange={handleInputChange}
              value={formData.senha}
            />
          </section>
        )}
        <SubmitButton text="Confirmar" />
      </form>
    </main>
  );
}

export default Register;

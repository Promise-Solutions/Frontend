import { useEffect, useState } from "react";
import axios from "axios";
import { setupRegisterEvents } from "./Register.script.js";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import logo from "../../assets/logo-branco-bg-sonoro.png";
import Select from "../../components/Form/Select.jsx";
import SelectTypeUser from "../../components/Form/SelectTypeUser.jsx";

function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    categoria: "",
    tipo: "",
    senha: "",
  });

  const [categories, setCategories] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/type", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setType(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const cleanup = setupRegisterEvents();
    return cleanup;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <section className="flex flex-col items-center justify-start gap-6 w-full px-4 py-8">
        <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
        <h1 className="font-medium text-4xl tracking-widest text-[#9A3379] text-center">
          Registre um novo usuário
        </h1>
      </section>
      <form
        autoComplete="off"
        className="flex flex-col items-center gap-10 w-full px-4 py-8"
      >
        <section className="flex flex-wrap items-center justify-between w-full gap-4">
          <SelectTypeUser
            text="Tipo de usuário"
            name="tipo"
            options={type}
            handleOnChange={(e) => handleInputChange(e)}
            value={formData.tipo}
          />
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
            text="Email"
            name="email"
            placeholder="Digite o email"
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
          <Select
            text="Categoria"
            name="categoria"
            options={categories}
            handleOnChange={handleInputChange}
            value={formData.categoria}
          />
        </section>
        <SubmitButton text="Confirmar" />
      </form>
    </main>
  );
}

export default Register;

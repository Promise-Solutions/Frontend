import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/Form/SubmitButton";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (nav) {
      nav.style.display =
        window.location.pathname === "/login" ? "none" : "flex";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/usuarios")
      .then((response) => {
        const usuarios = response.data;
        console.log("Usuários encontrados:", usuarios);

        const usuarioEncontrado = usuarios.find(
          (usuario) =>
            usuario.email === formData.email && usuario.senha === formData.senha
        );

        if (usuarioEncontrado) {
          localStorage.setItem("token", usuarioEncontrado.token);
          toast.success("Usuário autenticado com sucesso!");

          //N é o ideal, mas como a tela precisa ser atualizada, pro toast aparecer tem q ter um tempo
          setTimeout(() => {
            window.location.href = "/home";
          }, 1500);
        } else {
          alert("Erro ao autenticar. Verifique suas credenciais.");
        }
      })
      .catch((error) => console.error("Erro ao buscar usuários:", error));
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
            text="Email"
            name="email"
            placeholder="Digite o email"
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
            value={formData.senha}
          />
          <SubmitButton text="Confirmar" />
        </form>
      </div>
    </div>
  );
};

export default Login;

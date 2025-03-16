import { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import Background from "../../assets/background-login.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });

  useEffect(() => {
    const nav = document.querySelector(".navbar");
    if (window.location.pathname === "/login") {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          window.location.href = "/home";
        } else {
          // ! Remover depois para funcionar corretamente
          sessionStorage.setItem("token", data.token);
          window.location.href = "/home";
          // alert("Erro ao autenticar.");
        }
      })
      .catch((error) => console.log("Erro:", error));
  };

  return (
    <div
      className="container text-white min-w-screen min-h-screen flex items-center justify-center"
      style={{ background: `url(${Background}) no-repeat center center/cover` }}
    >
      <div
        className="box border-1 border-[#9A3379] flex justify-center items-center flex-col pb-32 pt-4 px-28"
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

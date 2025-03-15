import { useEffect } from "react";
import { setupRegisterEvents } from "./Register.script.js";

import logo from "../../assets/logo-branco-bg-sonoro.png";

function Register() {
  useEffect(() => {
    const cleanup = setupRegisterEvents();
    return cleanup;
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#060607] to-[#11113e] text-[white] font-sans">
      <section className="flex flex-col items-center justify-start gap-6 w-full px-4 py-8">
        <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
        <h1 className="font-medium text-4xl tracking-widest text-[#056f5b] text-center">
          Registre um novo funcionário
        </h1>
      </section>
      <form className="flex flex-col items-center gap-10 w-full px-4 py-8">
        <section className="flex flex-wrap items-center justify-between w-full gap-4">
          <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
            <label className="text-sm text-[white]">Nome</label>
            <input
              id="input_nome"
              type="text"
              autoComplete="off"
              className="h-8 bg-transparent border-b border-[#5f6176] text-[white] text-lg focus:outline-none transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
            <label className="text-sm text-[white]">CPF</label>
            <input
              id="input_cpf"
              type="text"
              maxLength="14"
              autoComplete="off"
              className="h-8 bg-transparent border-b border-[#5f6176] text-[white] text-lg focus:outline-none transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
            <label className="text-sm text-[white]">Email</label>
            <input
              id="input_email"
              type="email"
              autoComplete="off"
              className="h-8 bg-transparent border-b border-[#5f6176] text-[white] text-lg focus:outline-none transition-all duration-150 ease-in-out"
            />
          </div>
          <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
            <label className="text-sm text-[white]">Telefone</label>
            <input
              id="input_telefone"
              type="text"
              maxLength="15"
              autoComplete="off"
              className="h-8 bg-transparent border-b border-[#5f6176] text-[white] text-lg focus:outline-none transition-all duration-150 ease-in-out"
            />
          </div>
        </section>
        <button
          id="btn_confirm"
          disabled
          className="h-[55px] w-full max-w-[550px] border-2 border-[#33343f] rounded-full cursor-not-allowed text-xl tracking-widest bg-[#530d3e] text-[white] transition-all duration-300 ease-in-out disabled:bg-[#33343f] disabled:text-[#5f6176]"
        >
          Confirmar
        </button>
      </form>
    </main>
  );
}

export default Register;

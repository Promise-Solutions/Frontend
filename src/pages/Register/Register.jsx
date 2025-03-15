import { useEffect } from "react";
import { setupRegisterEvents } from "./Register.script.js";

import styles from "./register.module.css";
import logo from "../../assets/logo-branco-bg-sonoro.png";


function Register() {
  useEffect(() => {
    const cleanup = setupRegisterEvents();
    return cleanup;
  }, []);

    return (
    <main className={styles.container}>
      <section className={styles.contentTop}>
        <img
          src={logo}
          alt="logo-studio-zero-header"
        />
        <h1>Registre um novo funcionário</h1>
      </section>
      <form id="container-form">
        <section className={styles.containerFields}>
          <div className={styles.field}>
            <span>Nome</span>
            <input id="input_nome" type="text" autoComplete="off" />
          </div>
          <div className={styles.field}>
            <span>CPF</span>
            <input
              id="input_cpf"
              type="text"
              maxLength="14"
              autoComplete="off"
            />
          </div>
          <div className={styles.field}>
            <span>Email</span>
            <input id="input_email" type="email" autoComplete="off" />
          </div>
          <div className={styles.field}>
            <span>Telefone</span>
            <input
              id="input_telefone"
              type="text"
              maxLength="15"
              autoComplete="off"
            />
          </div>
        </section>
        <button id="btn_confirm" disabled>
          Confirmar
        </button>
      </form>
    </main>
  );
}

export default Register;

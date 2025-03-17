export function setupRegisterEvents() {
  const iptNome = document.querySelector("#nome");
  const iptEmail = document.querySelector("#email");
  const iptCpf = document.querySelector("#cpf");
  const iptTelefone = document.querySelector("#telefone");
  const iptSenha = document.querySelector("#senha");
  const btnConfirm = document.getElementById("btn_form");

  if (!iptNome || !iptEmail || !iptCpf || !iptTelefone || !btnConfirm) {
    console.error("Elementos do formulário não encontrados.");
    return;
  }

  const validarEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return regex.test(iptEmail.value);
  };

  const validarCampos = () => {
    if (
      iptNome.value.trim() &&
      iptCpf.value.length === 14 &&
      iptEmail.value &&
      iptTelefone.value.length === 15 &&
      iptSenha.value >= 8 &&
      validarEmail()
    ) {
      return true;
    }
    alert("Campos inválidos!");
    return false;
  };

  const generateToken = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const isTokenUnique = async (token) => {
    const response = await fetch("http://localhost:5000/usuarios");
    const users = await response.json();
    return !users.some((user) => user.token === token);
  };

  const registrarFuncionario = async () => {
    if (!validarCampos()) return;

    let token;
    do {
      token = generateToken();
    } while (!(await isTokenUnique(token)));

    const novoUsuario = {
      nome: iptNome.value,
      cpf: iptCpf.value,
      email: iptEmail.value,
      telefone: iptTelefone.value,
      senha: iptSenha.value,
      token: token,
    };

    fetch("http://localhost:5000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    })
      .then((res) => {
        if (res.ok) {
          alert("Cadastro realizado com sucesso!");
          iptNome.value = "";
          iptCpf.value = "";
          iptEmail.value = "";
          iptTelefone.value = "";
          iptSenha.value = "";
        } else {
          alert("Erro ao cadastrar funcionário.");
        }
      })
      .catch((error) => console.log("Erro:", error));
  };

  const handleConfirmClick = (event) => {
    event.preventDefault();
    registrarFuncionario();
  };

  btnConfirm.addEventListener("click", handleConfirmClick);

  //Tratatmento do campo de CPF
  iptCpf.addEventListener("keydown", (event) => {
    let value = iptCpf.value.replace(/\D/g, "");
    if (value.length >= 11 && event.key !== "Backspace") {
      event.preventDefault();
      return;
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + "." + value.slice(3);
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + "." + value.slice(7);
    }
    if (value.length > 11) {
      value = value.slice(0, 11) + "-" + value.slice(11);
    }
    iptCpf.value = value;
  });

  //Tratamento do campo de telefone
  iptTelefone.addEventListener("keydown", (event) => {
    let value = iptTelefone.value.replace(/\D/g, "");
    if (value.length >= 11 && event.key !== "Backspace") {
      event.preventDefault();
      return;
    }
    if (value.length > 0) {
      value = "(" + value;
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + ") " + value.slice(3);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + "-" + value.slice(10);
    }
    iptTelefone.value = value;
  });

  return () => {
    btnConfirm.removeEventListener("click", handleConfirmClick);
  };
}

export default setupRegisterEvents;

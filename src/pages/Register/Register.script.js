export function setupRegisterEvents() {

  // Pegando os elementos do formulário
  const iptNome = document.querySelector("#nome");
  const iptEmail = document.querySelector("#email");
  const iptCpf = document.querySelector("#cpf");
  const iptTelefone = document.querySelector("#telefone");
  const iptSenha = document.querySelector("#senha");
  const btnConfirm = document.getElementById("btn_form");

  // Verificando se os campos existem, tava dando um bug q n tava sendo renderizado
  if (!iptNome || !iptEmail || !iptCpf || !iptTelefone || !btnConfirm) {
    console.error("Elementos do formulário não encontrados.");
    return;
  }

  // Validação de email
  const validarEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return regex.test(iptEmail.value);
  };

  // Validação de campos
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

  // Gerando Token, isso vai ser passado pro backend dps
  const generateToken = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  // Verificando se o token é único
  const isTokenUnique = async (token) => {
    const response = await fetch("http://localhost:5000/usuarios");
    const users = await response.json();
    return !users.some((user) => user.token === token);
  };

  // Função de registrar funcionário
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
          alert("Erro ao cadastrar usuários.");
        }
      })
      .catch((error) => console.log("Erro:", error));
  };

  // Lógica de evento de clique no botão de confirmação, removemos a ação no return la embaixo
  const handleConfirmClick = (event) => {
    event.preventDefault();
    registrarFuncionario();
  };
  btnConfirm.addEventListener("click", handleConfirmClick);

  // Tratamento do campo de CPF
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

  // Tratamento do campo de telefone
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

  // Removendo o evento de clique no botão de confirmação para evitar duplicação
  return () => {
    btnConfirm.removeEventListener("click", handleConfirmClick);
  };
}

export default setupRegisterEvents;

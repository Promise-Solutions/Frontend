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

  const verificarPreenchimento = () => {
    btnConfirm.disabled = !(
      iptNome.value.trim() &&
      iptCpf.value.length === 14 &&
      iptEmail.value &&
      iptTelefone.value.length === 15
    );
  };

  const formatarCpf = (inputValue) => {
    return inputValue
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatarTelefone = (inputValue) => {
    return inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
      .slice(0, 15);
  };

  const handleCpfInput = () => {
    iptCpf.value = formatarCpf(iptCpf.value);
    verificarPreenchimento();
  };

  const handleTelefoneInput = () => {
    iptTelefone.value = formatarTelefone(iptTelefone.value);
    verificarPreenchimento();
  };

  const validarEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return regex.test(iptEmail.value);
  };

  const validarCampos = () => {
    if (
      iptCpf.value.length !== 14 ||
      iptTelefone.value.length !== 15 ||
      iptSenha.value.length < 8 ||
      !validarEmail()
    ) {
      alert("Campos inválidos!");
      return false;
    }
    return true;
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
          verificarPreenchimento();
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

  iptNome.addEventListener("input", verificarPreenchimento);
  iptCpf.addEventListener("input", handleCpfInput);
  iptEmail.addEventListener("input", verificarPreenchimento);
  iptTelefone.addEventListener("input", handleTelefoneInput);
  iptSenha.addEventListener("input", verificarPreenchimento);
  btnConfirm.addEventListener("click", handleConfirmClick);

  return () => {
    iptNome.removeEventListener("input", verificarPreenchimento);
    iptCpf.removeEventListener("input", handleCpfInput);
    iptEmail.removeEventListener("input", verificarPreenchimento);
    iptTelefone.removeEventListener("input", handleTelefoneInput);
    iptSenha.removeEventListener("input", verificarPreenchimento);
    btnConfirm.removeEventListener("click", handleConfirmClick);
  };
}

export default setupRegisterEvents;

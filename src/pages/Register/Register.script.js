export function setupRegisterEvents() {
  setTimeout(() => {
    const iptNome = document.querySelector("#input_nome");
    const iptEmail = document.querySelector("#input_email");
    const iptCpf = document.querySelector("#input_cpf");
    const iptTelefone = document.querySelector("#input_telefone");
    const btnConfirm = document.querySelector("#btn_confirm");

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

    const formatarCpf = () => {
      iptCpf.value = iptCpf.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2");
    };

    const formatarTelefone = () => {
      iptTelefone.value = iptTelefone.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d+)/, "$1-$2");
    };

    const validarEmail = () => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
      return regex.test(iptEmail.value);
    };

    const validarCampos = () => {
      if (
        iptCpf.value.length !== 14 ||
        iptTelefone.value.length !== 15 ||
        !validarEmail()
      ) {
        alert("Campos inválidos!");
        return false;
      }
      return true;
    };

    const registrarFuncionario = () => {
      if (!validarCampos()) return;

      const novoUsuario = {
        nome: iptNome.value,
        cpf: iptCpf.value,
        email: iptEmail.value,
        telefone: iptTelefone.value,
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
            verificarPreenchimento();
          } else {
            alert("Erro ao cadastrar funcionário.");
          }
        })
        .catch((error) => console.log("Erro:", error));
    };

    iptNome.addEventListener("input", verificarPreenchimento);
    iptCpf.addEventListener("input", () => {
      formatarCpf();
      verificarPreenchimento();
    });
    iptEmail.addEventListener("input", verificarPreenchimento);
    iptTelefone.addEventListener("input", () => {
      formatarTelefone();
      verificarPreenchimento();
    });
    btnConfirm.addEventListener("click", (event) => {
      event.preventDefault();
      registrarFuncionario();
    });

    return () => {
      iptNome.removeEventListener("input", verificarPreenchimento);
      iptCpf.removeEventListener("input", formatarCpf);
      iptEmail.removeEventListener("input", verificarPreenchimento);
      iptTelefone.removeEventListener("input", formatarTelefone);
      btnConfirm.removeEventListener("click", registrarFuncionario);
    };
  }, 3000);
}

export default setupRegisterEvents;
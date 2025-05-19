import { axiosProvider } from "../../provider/apiProvider"; // Importando o axiosProvider
import { toast } from "react-hot-toast";
import { showToast, ToastStyle } from "../../components/toastStyle/ToastStyle.jsx"; // Import ToastStyle
import { ROUTERS } from "../../constants/routers.js";

let isEventRegistered = false; // Variável de controle para evitar múltiplos registros

export function setupRegisterEvents(navigate) {
  // Pegando os elementos do formulário
  const iptNome = document.querySelector("#nome");
  const iptEmail = document.querySelector("#email");
  const iptCpf = document.querySelector("#cpf");
  const iptContato = document.querySelector("#contato");
  const iptSenha = document.querySelector("#senha");
  const iptType = document.querySelector("#tipo");
  const iptTipoCliente = document.querySelector("#tipoCliente");
  const btnConfirm = document.getElementById("btn_form");

  let cpfMaskListener = null;
  let contatoMaskListener = null;

  const applyCpfMask = () => {
    cpfMaskListener = (event) => {
      if (event.key === "Tab") return; // Allow Tab key for navigation
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
    };
    iptCpf.addEventListener("keydown", cpfMaskListener);
  };

  const removeCpfMask = () => {
    if (cpfMaskListener) {
      iptCpf.removeEventListener("keydown", cpfMaskListener);
      cpfMaskListener = null;
    }
  };

  const applyContatoMask = () => {
    contatoMaskListener = (event) => {
      if (event.key === "Tab") return; // Allow Tab key for navigation
      let value = iptContato.value.replace(/\D/g, "");
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
      iptContato.value = value;
    };
    iptContato.addEventListener("keydown", contatoMaskListener);
  };

  const removeContatoMask = () => {
    if (contatoMaskListener) {
      iptContato.removeEventListener("keydown", contatoMaskListener);
      contatoMaskListener = null;
    }
  };

  const setupMasks = () => {
    // Rebuscar os elementos do DOM
    const iptCpf = document.querySelector("#cpf");
    const iptContato = document.querySelector("#contato");

    // Remover máscaras antigas
    removeCpfMask();
    removeContatoMask();

    // Aplicar máscaras novamente
    if (iptCpf) {
      applyCpfMask();
    }
    if (iptContato) {
      applyContatoMask();
    }
  };

  // Atualizar máscaras ao alterar o tipo
  iptType.addEventListener("change", () => {
    setTimeout(() => {
      setupMasks(); // Reaplicar máscaras após o DOM ser atualizado
    }, 0);
  });

  // Aplicar máscaras inicialmente
  setupMasks();

  // Verificando se os campos existem, tava dando um bug q n tava sendo renderizado
  if (!iptNome || !iptEmail || !iptCpf || !iptContato || !btnConfirm) {
    return;
  }

  // Validação de email
  const validarEmail = () => {
    const iptEmail = document.querySelector("#email"); // Buscar elemento atualizado
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (!iptEmail || !iptEmail.value.trim()) {
      showToast.error("O campo de email está vazio.");
      return false;
    }
    if (!regex.test(iptEmail.value)) {
      showToast.error("O email inserido é inválido.");
      return false;
    }
    return true;
  };

  // Validação de campos
  const validarCampos = () => {
    const iptNome = document.querySelector("#nome"); // Buscar elementos atualizados
    const iptCpf = document.querySelector("#cpf");
    const iptEmail = document.querySelector("#email");
    const iptContato = document.querySelector("#contato");
    const iptSenha = document.querySelector("#senha");
    const iptType = document.querySelector("#tipo");
    const iptTipoCliente = document.querySelector("#tipoCliente");

    if (!iptNome || !iptNome.value.trim()) {
      showToast.error("O campo de nome está vazio.");
      return false;
    }

    if (!iptCpf || iptCpf.value.length !== 14) {
      showToast.error("O CPF deve ter 14 caracteres.");
      return false;
    }

    if (!validarEmail()) {
      return false;
    }

    if (!iptContato || iptContato.value.length !== 15) {
      showToast.error("O contato deve ter 15 caracteres.");
      return false;
    }

    if (iptType.value === "CLIENTE") {
      // Validação para cliente
      if (!iptTipoCliente || !iptTipoCliente.value.trim()) {
        showToast.error("O campo de tipo de cliente está vazio.", {
          style: ToastStyle,
        });
        return false;
      }
    } else if (iptType.value === "FUNCIONARIO") {
      // Validação para funcionário
      if (!iptSenha || iptSenha.value.length < 8) {
        showToast.error("A senha deve ter pelo menos 8 caracteres.", {
          style: ToastStyle,
        });
      }
    } else {
      showToast.error("Tipo de usuário inválido.");
      return false;
    }

    return true;
  };

  // Função de registrar usuário
  const registrarUsuario = async () => {
    // Buscar elementos atualizados
    const iptNome = document.querySelector("#nome");
    const iptEmail = document.querySelector("#email");
    const iptCpf = document.querySelector("#cpf");
    const iptContato = document.querySelector("#contato");
    const iptSenha = document.querySelector("#senha");
    const iptType = document.querySelector("#tipo");
    const iptTipoCliente = document.querySelector("#tipoCliente");

    if (!validarCampos()) return;

    let novoUsuario;
    let endpoint;

    if (iptType.value === "CLIENTE") {
      novoUsuario = {
        name: iptNome.value.toUpperCase(),
        cpf: iptCpf.value,
        email: iptEmail.value,
        contact: iptContato.value,
        clientType: iptTipoCliente?.value === "AVULSO" ? "SINGLE" : "MONTHLY", // Map values for backend
        active: true, // Default to active
        createdDate: new Date().toISOString(),
      };
      endpoint = "clients";
    } else if (iptType.value === "FUNCIONARIO") {
      novoUsuario = {
        name: iptNome.value.toUpperCase(),
        cpf: iptCpf.value,
        email: iptEmail.value,
        contact: iptContato.value,
        password: iptSenha?.value || "",
        active: true, // Default to active
        token: token,
      };
      endpoint = "employees";
    }

    try {
      const res = await axiosProvider.post(`/${endpoint}`, novoUsuario);
      if (res.status === 201) {
        showToast.success("Cadastro realizado com sucesso!");
        iptNome.value = "";
        iptCpf.value = "";
        iptEmail.value = "";
        iptContato.value = "";
        iptType.value = "";
        if (iptSenha) iptSenha.value = "";
        if (iptTipoCliente) iptTipoCliente.value = "";
        navigate(ROUTERS.USERS); // Use navigate passed as a parameter
      } else {
        showToast.error("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      showToast.error("Erro ao cadastrar usuário.");
      console.error("Erro:", error);
    }
  };

  // Lógica de evento de clique no botão de confirmação
  const handleConfirmClick = (event) => {
    event.preventDefault();
    registrarUsuario();
  };

  // Garantir que o evento seja registrado apenas uma vez
  if (!isEventRegistered) {
    btnConfirm.addEventListener("click", handleConfirmClick);
    isEventRegistered = true; // Marcar o evento como registrado
  }

  // Removendo o evento de clique no botão de confirmação para evitar duplicação
  return () => {
    btnConfirm.removeEventListener("click", handleConfirmClick);
    isEventRegistered = false; // Resetar a variável de controle ao desmontar
  };
}

export default setupRegisterEvents;

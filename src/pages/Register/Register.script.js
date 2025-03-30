import axios from "axios";
import toast from "react-hot-toast";
import { ToastStyle } from "../../components/ToastStyle/ToastStyle.jsx";

let isEventRegistered = false; // Variável de controle para evitar múltiplos registros

export function setupRegisterEvents() {
  // Pegando os elementos do formulário
  const iptNome = document.querySelector("#nome");
  const iptEmail = document.querySelector("#email");
  const iptCpf = document.querySelector("#cpf");
  const iptTelefone = document.querySelector("#telefone");
  const iptSenha = document.querySelector("#senha");
  const iptType = document.querySelector("#tipo");
  const iptTipoCliente = document.querySelector("#tipoCliente");
  const btnConfirm = document.getElementById("btn_form");

  let cpfMaskListener = null;
  let telefoneMaskListener = null;

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

  const applyTelefoneMask = () => {
    telefoneMaskListener = (event) => {
      if (event.key === "Tab") return; // Allow Tab key for navigation
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
    };
    iptTelefone.addEventListener("keydown", telefoneMaskListener);
  };

  const removeTelefoneMask = () => {
    if (telefoneMaskListener) {
      iptTelefone.removeEventListener("keydown", telefoneMaskListener);
      telefoneMaskListener = null;
    }
  };

  const setupMasks = () => {
    // Rebuscar os elementos do DOM
    const iptCpf = document.querySelector("#cpf");
    const iptTelefone = document.querySelector("#telefone");

    // Remover máscaras antigas
    removeCpfMask();
    removeTelefoneMask();

    // Aplicar máscaras novamente
    if (iptCpf) {
      applyCpfMask();
    }
    if (iptTelefone) {
      applyTelefoneMask();
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
  if (!iptNome || !iptEmail || !iptCpf || !iptTelefone || !btnConfirm) {
    console.error("Elementos do formulário não encontrados.");
    return;
  }

  // Validação de email
  const validarEmail = () => {
    const iptEmail = document.querySelector("#email"); // Buscar elemento atualizado
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (!iptEmail || !iptEmail.value.trim()) {
      toast.error("O campo de email está vazio.", { style: ToastStyle });
      return false;
    }
    if (!regex.test(iptEmail.value)) {
      toast.error("O email inserido é inválido.", { style: ToastStyle });
      return false;
    }
    return true;
  };

  // Validação de campos
  const validarCampos = () => {
    const iptNome = document.querySelector("#nome"); // Buscar elementos atualizados
    const iptCpf = document.querySelector("#cpf");
    const iptEmail = document.querySelector("#email");
    const iptTelefone = document.querySelector("#telefone");
    const iptSenha = document.querySelector("#senha");
    const iptType = document.querySelector("#tipo");
    const iptTipoCliente = document.querySelector("#tipoCliente");

    if (!iptNome || !iptNome.value.trim()) {
      toast.error("O campo de nome está vazio.", { style: ToastStyle });
      return false;
    }

    if (!iptCpf || iptCpf.value.length !== 14) {
      toast.error("O CPF deve ter 14 caracteres.", { style: ToastStyle });
      return false;
    }

    if (!validarEmail()) {
      return false;
    }

    if (!iptTelefone || iptTelefone.value.length !== 15) {
      toast.error("O telefone deve ter 15 caracteres.", { style: ToastStyle });
      return false;
    }

    if (iptType.value === "CLIENTE") {
      // Validação para cliente
      if (!iptTipoCliente || !iptTipoCliente.value.trim()) {
        toast.error("O campo de tipo de cliente está vazio.", {
          style: ToastStyle,
        });
        return false;
      }
    } else if (iptType.value === "FUNCIONARIO") {
      // Validação para funcionário
      if (!iptSenha || iptSenha.value.length < 8) {
        toast.error("A senha deve ter pelo menos 8 caracteres.", {
          style: ToastStyle,
        });
      }
    } else {
      toast.error("Tipo de usuário inválido.", { style: ToastStyle });
      return false;
    }

    return true;
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

  // Função de registrar usuário
  const registrarUsuario = async () => {
    // Buscar elementos atualizados
    const iptNome = document.querySelector("#nome");
    const iptEmail = document.querySelector("#email");
    const iptCpf = document.querySelector("#cpf");
    const iptTelefone = document.querySelector("#telefone");
    const iptSenha = document.querySelector("#senha");
    const iptType = document.querySelector("#tipo");
    const iptTipoCliente = document.querySelector("#tipoCliente");

    if (!validarCampos()) return;

    const token = generateToken(); // Gerar token sem verificar unicidade

    let novoUsuario;
    let endpoint;

    if (iptType.value === "CLIENTE") {
      novoUsuario = {
        nome: iptNome.value.toUpperCase(),
        cpf: iptCpf.value,
        email: iptEmail.value,
        telefone: iptTelefone.value,
        tipoCliente: iptTipoCliente?.value || "AVULSO", // Correctly assign tipoCliente
        ativo: true, // Default to active
        token: token,
      };
      endpoint = "clientes";
    } else if (iptType.value === "FUNCIONARIO") {
      novoUsuario = {
        nome: iptNome.value.toUpperCase(),
        cpf: iptCpf.value,
        email: iptEmail.value,
        telefone: iptTelefone.value,
        senha: iptSenha?.value || "",
        ativo: true, // Default to active
        token: token,
      };
      endpoint = "funcionarios";
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/${endpoint}`,
        novoUsuario
      );
      if (res.status === 201) {
        toast.success("Cadastro realizado com sucesso!", { style: ToastStyle });
        iptNome.value = "";
        iptCpf.value = "";
        iptEmail.value = "";
        iptTelefone.value = "";
        iptType.value = "";
        if (iptSenha) iptSenha.value = "";
        if (iptTipoCliente) iptTipoCliente.value = "";
      } else {
        toast.error("Erro ao cadastrar usuário.", { style: ToastStyle });
      }
    } catch (error) {
      toast.error("Erro ao cadastrar usuário.", { style: ToastStyle });
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

const iptNome = document.querySelector('#input_nome'); 
const iptEmail = document.querySelector('#input_email'); 
const iptCpf = document.querySelector('#input_cpf'); 
const iptTelefone = document.querySelector('#input_telefone'); 
const btnConfirm = document.querySelector('#btn_confirm'); 

iptNome.addEventListener("input", () => {
    verificarPreenchimento();
})

iptCpf.addEventListener("input", () => {
    formatarCpf();
    verificarPreenchimento();
})

iptEmail.addEventListener("input", () => {
    verificarPreenchimento();
})

iptTelefone.addEventListener("input", () => {
    formatarTelefone();
    verificarPreenchimento();
})

btnConfirm.addEventListener("click", (event) => {
    event.preventDefault();
    if(validarCampos()) {
        const novoUsuario = {
            nome: iptNome.value,
            cpf:iptCpf.value,
            email: iptEmail.value,
            telefone: iptTelefone.value
        }

        registrarFuncionario(novoUsuario);
    }
})

const formatarCpf = () => { 
    let cpf = iptCpf.value; 

    iptCpf.value = cpf.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2');
}

const validarEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/
    if(regex.test(iptEmail.value)) {
        return true;
    }
}

const formatarTelefone = () => {
    let telefone = iptTelefone.value;

    iptTelefone.value = telefone.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d+)/, '$1-$2')
}

const validarCampos = () => {
    if(iptCpf.value.length != 14 || iptTelefone.value.length != 15 ||  !validarEmail()) {
        alert('Campos inválidos!')
        return false;
    }

    return true;
}

const registrarFuncionario = (usuario) => {
    const usuarioFormatado = JSON.stringify(usuario);

    fetch("http://localhost:8080/usuarios",
        {
            body: usuarioFormatado,
            method: "POST"
        }    
    ).then((res) => {
        console.log("res", res)
        console.log("código de resposta: " + res.status)
        alert('Cadastrado realizado com sucesso')
    })
    .catch((error) => {
        console.log("Erro: " + error);
    })
}

const verificarPreenchimento = () => {
    const tamanhoNome = iptNome.value.trim().length;

    if(tamanhoNome != 0 && iptCpf.value.length != 0 && iptEmail.value.length != 0 && iptTelefone.value.length != 0) {
        btnConfirm.disabled = false;
    } else {
        btnConfirm.disabled = true;
    }

}
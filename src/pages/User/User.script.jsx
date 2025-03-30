import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.jsx";
import toast from "react-hot-toast"; // Importa o toast para exibir mensagens
import Select from "../../components/Form/Select.jsx";
import Input from "../../components/Form/Input.jsx";

export const RenderInfos = () => {
  const { user, setUser, userToken } = useUserContext();
  const [currentUser, setCurrentUser] = useState({});
  const [isClient, setIsClient] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to control edit section visibility

  useEffect(() => {
    if (!userToken) {
      // Verifica se há dados salvos no sessionStorage
      const savedUser = sessionStorage.getItem("lastUserData");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsClient(parsedUser.isClient); // Usa a flag isClient salva no sessionStorage
        toast("Últimos dados obtidos foram carregados.", {
          icon: "ℹ️", // Ícone de informação
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            border: "solid 1px #9A3379",
          },
        });
      }
      return;
    }

    const fetchUserData = async () => {
      toast.promise(
        (async () => {
          try {
            let response = await axios.get(
              `http://localhost:5000/clientes?token=${userToken}`
            );
            let userData = response.data[0];

            if (!userData) {
              response = await axios.get(
                `http://localhost:5000/funcionarios?token=${userToken}`
              );
              userData = response.data[0];
              if (userData) {
                setIsClient(false); // Set isClient to false for funcionarios
              }
            } else {
              setIsClient(true); // Set isClient to true for clientes
            }

            if (!userData) {
              throw new Error("Usuário não encontrado no banco de dados.");
            }

            const updatedUser = { ...userData, isClient }; // Inclui a flag isClient no objeto do usuário
            setUser(updatedUser);
            setCurrentUser(updatedUser);

            // Salva os dados no sessionStorage com a flag isClient
            sessionStorage.setItem("lastUserData", JSON.stringify(updatedUser));
          } catch (error) {
            console.error("Erro ao buscar usuário:", error);

            // Carrega os últimos dados salvos no sessionStorage
            const savedUser = sessionStorage.getItem("lastUserData");
            if (savedUser) {
              const parsedUser = JSON.parse(savedUser);
              setCurrentUser(parsedUser);
              setIsClient(parsedUser.isClient); // Usa a flag isClient salva no sessionStorage
              toast(
                "Erro ao acessar o servidor. Últimos dados obtidos foram carregados.",
                {
                  icon: "⚠️", // Ícone de aviso
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    border: "solid 1px #9A3379",
                  },
                }
              );
            } else {
              throw new Error(
                "Erro ao acessar o servidor e nenhum dado local encontrado."
              );
            }
          }
        })(),
        {
          loading: "Buscando informações do usuário...",
          success: "Informações carregadas com sucesso.",
          error: "Erro ao buscar informações do usuário.",
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            border: "solid 1px #9A3379",
          },
        }
      );
    };

    fetchUserData();
  }, [userToken]);

  function Edit() {
    const [formData, setFormData] = useState({
      nome: currentUser.nome || "",
      cpf: currentUser.cpf || "",
      email: currentUser.email || "",
      telefone: currentUser.telefone || "",
      tipoCliente: currentUser.tipoCliente || "",
      ativo: currentUser.ativo || false,
      senha: "", // Campo adicional para funcionários
    });

    const clienteOptions = [
      { id: "AVULSO", name: "Avulso" },
      { id: "MENSAL", name: "Mensal" },
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const applyCpfMask = (value) => {
      value = value.replace(/\D/g, "").slice(0, 11); // Limit to 11 digits
      if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
      return value;
    };

    const applyTelefoneMask = (value) => {
      value = value.replace(/\D/g, "").slice(0, 11); // Limit to 11 digits
      if (value.length > 0) value = "(" + value;
      if (value.length > 3) value = value.slice(0, 3) + ") " + value.slice(3);
      if (value.length > 10) value = value.slice(0, 10) + "-" + value.slice(10);
      return value;
    };

    const handleMaskedInputChange = (e) => {
      const { name, value } = e.target;
      let maskedValue = value;

      if (name === "cpf") maskedValue = applyCpfMask(value);
      if (name === "telefone") maskedValue = applyTelefoneMask(value);

      setFormData((prevData) => ({ ...prevData, [name]: maskedValue }));
    };

    const handleSaveChanges = async () => {
      try {
        const updatedFormData = {
          ...formData,
          nome: formData.nome.toUpperCase(), // Convert nome to uppercase
        };

        // Remove senha if empty
        if (!formData.senha) {
          delete updatedFormData.senha;
        }

        // Remove tipoCliente if not a client
        if (!isClient) {
          delete updatedFormData.tipoCliente;
        }

        const endpoint = isClient
          ? `http://localhost:5000/clientes/${currentUser.id}`
          : `http://localhost:5000/funcionarios/${currentUser.id}`;
        await axios.patch(endpoint, updatedFormData);
        toast.success("Informações atualizadas com sucesso!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            border: "solid 1px #9A3379",
          },
        });

        const updatedUser = { ...currentUser, ...updatedFormData };
        setCurrentUser(updatedUser);
        setUser(updatedUser);

        // Save updated user to sessionStorage
        sessionStorage.setItem("lastUserData", JSON.stringify(updatedUser));

        setIsEditing(false); // Hide edit section
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        toast.error("Erro ao salvar alterações. Tente novamente.", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            border: "solid 1px #9A3379",
          },
        });
      }
    };

    return (
      <section id="edit_section" className="mt-12 flex w-full justify-between">
        <div className="flex flex-col">
          <h1 className="text-[42px]">
            <b>Editar Informações</b>
          </h1>
          <span className="text-[18px]">Altere as informações</span>
          <ul className="flex flex-col mt-6 gap-2">
            {isClient ? (
              <>
                <li>
                  <Select
                    text="Tipo de Cliente"
                    name="tipoCliente"
                    options={clienteOptions}
                    handleOnChange={handleInputChange}
                    value={formData.tipoCliente}
                  />
                </li>
              </>
            ) : null}
            <li>
              <Input
                text="Nome"
                type="text"
                name="nome"
                value={formData.nome}
                handleOnChange={handleInputChange}
              />
            </li>
            <li>
              <Input
                text="Email"
                type="email"
                name="email"
                value={formData.email}
                handleOnChange={handleInputChange}
              />
            </li>
            <li>
              <Input
                text="CPF"
                type="text"
                name="cpf"
                value={formData.cpf}
                handleOnChange={handleMaskedInputChange}
              />
            </li>
            <li>
              <Input
                text="Telefone"
                type="text"
                name="telefone"
                value={formData.telefone}
                handleOnChange={handleMaskedInputChange}
              />
            </li>
            {!isClient ? (
              <li>
                <Input
                  text="Senha"
                  type="text"
                  name="senha"
                  value={formData.senha}
                  handleOnChange={handleInputChange}
                />
              </li>
            ) : null}
            <li>
              <Select
                text="Status"
                name="ativo"
                options={[
                  { id: true, name: "Ativo" },
                  { id: false, name: "Inativo" },
                ]}
                handleOnChange={handleInputChange}
                value={formData.ativo}
              />
            </li>
          </ul>
        </div>
        <PrimaryButton
          id="button_confirm_edit"
          text="Salvar Alterações"
          onClick={handleSaveChanges}
        />
      </section>
    );
  }

  return (
    <div className="w-full">
      {" "}
      {/* Adicionado w-full para garantir largura total */}
      {!isEditing ? (
        <section
          id="info_section"
          className="mt-12 flex w-full justify-between" // Garantir w-full aqui também
        >
          <div className="flex flex-col">
            <h1 className="text-[42px]">
              <b>{isClient ? "Cliente: " : "Funcionário: "}</b>{" "}
              {(user || currentUser).nome}
            </h1>
            <span className="text-[18px]">Altere as informações</span>
            <ul className="flex flex-col mt-6 gap-2">
              {!isClient ? null : (
                <li>
                  <b>Tipo de Cliente: </b> {(user || currentUser).tipoCliente}
                </li>
              )}
              <li>
                <b>Email: </b> {(user || currentUser).email}
              </li>
              <li>
                <b>CPF: </b> {(user || currentUser).cpf}
              </li>
              <li>
                <b>Telefone: </b> {(user || currentUser).telefone}
              </li>
              <li>
                <b>Status: </b>{" "}
                {(user || currentUser).ativo ? "Ativo" : "Inativo"}
              </li>
            </ul>
          </div>
          <PrimaryButton
            id="button_edit"
            text="Editar Usuário"
            onClick={() => setIsEditing(true)} // Show edit section on button click
          />
        </section>
      ) : (
        <section
          id="edit_section"
          className="mt-12 flex w-full justify-between" // Garantir w-full aqui também
        >
          <Edit />
        </section>
      )}
    </div>
  );
};

import { useState } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.jsx";
import toast from "react-hot-toast";
import Select from "../../components/Form/Select.jsx";
import Input from "../../components/Form/Input.jsx";
import axios from "axios";
import DeleteButton from "../../components/DeleteButton/DeleteButton.jsx";

export const RenderInfos = () => {
  const { user, setUser, userId, isClient } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  function Edit() {
    const [formData, setFormData] = useState({
      nome: user?.nome || "",
      cpf: user?.cpf || "",
      email: user?.email || "",
      telefone: user?.telefone || "",
      tipoCliente: user?.tipoCliente || "",
      ativo: user?.ativo || false,
      senha: "",
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
      await toast.promise(
        (async () => {
          try {
            const updatedFormData = {
              ...formData,
              nome: formData.nome.toUpperCase(),
            };

            if (!formData.senha) delete updatedFormData.senha;
            if (!isClient) delete updatedFormData.tipoCliente;

            const endpoint = isClient
              ? `http://localhost:5000/clientes/${userId}`
              : `http://localhost:5000/funcionarios/${userId}`;
            await axios.patch(endpoint, updatedFormData);

            setUser({ ...user, ...updatedFormData });
            setIsEditing(false);
          } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            throw new Error("Erro ao salvar alterações. Tente novamente.");
          }
        })(),
        {
          loading: "Salvando alterações...",
          success: "Informações atualizadas com sucesso!",
          error: "Erro ao salvar alterações.",
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
      {!isEditing ? (
        <section
          id="info_section"
          className="mt-12 flex w-full justify-between"
        >
          <div className="flex flex-col">
            <h1 className="text-[42px]">
              <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.nome}
            </h1>
            <span className="text-[18px]">Altere as informações</span>
            <ul className="flex flex-col mt-6 gap-2">
              {!isClient ? null : (
                <li>
                  <b>Tipo de Cliente: </b> {user?.tipoCliente}
                </li>
              )}
              <li>
                <b>Email: </b> {user?.email}
              </li>
              <li>
                <b>CPF: </b> {user?.cpf}
              </li>
              <li>
                <b>Telefone: </b> {user?.telefone}
              </li>
              <li>
                <b>Status: </b> {user?.ativo ? "Ativo" : "Inativo"}
              </li>
            </ul>
          </div>
          <PrimaryButton
            id="button_edit"
            text="Editar Usuário"
            onClick={() => setIsEditing(true)}
          />
        </section>
      ) : (
        <Edit />
      )}
      <div className="flex justify-end">
        <DeleteButton id="delete_button" text= "Deletar Usuário"/>
      </div>
    </div>
  );
};

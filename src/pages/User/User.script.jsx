import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import PrimaryButton from "../../components/primaryButton/PrimaryButton.jsx";
import { useJobContext } from "../../context/JobContext.jsx";
import { showToast } from "../../components/toastStyle/ToastStyle.jsx";
import Select from "../../components/form/Select.jsx";
import Input from "../../components/form/Input.jsx";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/DeleteButton.jsx";
import Dropdown from "../../components/dropdown/Dropdown.jsx";
import ModalConfirmDelete from "../../components/modalConfirmDelete/ModalConfirmDelete.jsx";
import ScreenFilter from "../../components/screenFilter/ScreenFilter.jsx";
import LineGrafic from "../../components/graphic/FreqPagGraphic.jsx";
import React from "react";
import CardJob from "../../components/CardJob/CardJob.jsx";
import toast from "react-hot-toast"; // Add this import
import { useNavigate } from "react-router-dom";
import RegisterButton from "../../components/RegisterButton/RegisterButton.jsx";

export const RenderInfos = () => {
  const { user, setUser, userId, isClient } = useUserContext(); // Contexto do usuário
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [filteredJobs, setFilteredJobs] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla o modal de exclusão
  const [filterScreen, setFilterScreen] = useState("1"); // Controla o filtro de tela
  const { findJobs } = useJobContext(); 
  const navigate = useNavigate();

  // Função para deletar usuário
  const handleDeleteUser = async () => {
    try {
      // Check for open commands
      const commandsEndpoint = `http://localhost:5000/commands`;
      const { data: commands } = await axios.get(commandsEndpoint);
      const hasOpenCommand = commands.some(
        (command) =>
          (isClient
            ? command.fkCliente === userId
            : command.fkFuncionario === userId) && command.status === "Aberta"
      );

      if (hasOpenCommand) {
        showToast.error(
          "Não é possível deletar o usuário com uma comanda aberta."
        );
        return;
      }

      // Proceed with deletion
      const endpoint = isClient
        ? `http://localhost:5000/clientes/${userId}`
        : `http://localhost:5000/funcionarios/${userId}`;
      await axios.delete(endpoint);
      showToast.success("Usuário deletado com sucesso!");
      navigate("/users");
    } catch (error) {
      showToast.error("Erro ao deletar usuário. Tente novamente.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const renderJobs = async () => {
    const jobsRendered = await createFilteredJobs(findJobs)
    console.log("render jobs", jobsRendered)

    setFilteredJobs(jobsRendered);

  }

  const registerRedirect = (navigate) => {
    navigate("/register/jobs")
  }

  const createFilteredJobs = async (
    findJobs,
  ) => {
    const jobs = await findJobs();
    console.log("jobs", jobs)
  
    return jobs.map((job) => {
      console.log("Renderizando serviços:", {
        title: job.titulo,
        category: job.categoria,
      });
  
      return job.fkCliente == userId ? React.createElement(CardJob, {
        key: job.id,
        id: job.id,
        title: job.titulo,
        category: job.categoria,
        date: job.dataRegistro,
        time: job.horario,
        isDone: job.concluido,
        userId: job.fkCliente,
        onClick: () => {
          localStorage.setItem("jobId", job.id);
          navigate(`/jobs/${job.id}`); // redireciona sem recarregar a página
      },
      }): null;
    });
  };

  useEffect(() => {
    renderJobs();
  },[])

  function Edit() {
    const [formData, setFormData] = useState({
      nome: user?.nome || "",
      cpf: user?.cpf || "",
      email: user?.email || "",
      contato: user?.contato || "",
      tipoCliente: user?.tipoCliente || "", // Garantir que o valor inicial seja do banco
      ativo: user?.ativo !== undefined ? user.ativo : false, // Garantir que o valor inicial seja booleano
      senha: "",
    });

    const clienteOptions = [
      { id: "AVULSO", name: "Avulso" },
      { id: "MENSAL", name: "Mensal" },
    ];

    const statusOptions = [
      { id: "true", name: "Ativo" }, // Use strings "true" and "false" for consistency
      { id: "false", name: "Inativo" },
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const parsedValue = name === "ativo" ? value === "true" : value; // Convert "ativo" to boolean
      setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    const applyCpfMask = (value) => {
      value = value.replace(/\D/g, "").slice(0, 11); // Limit to 11 digits
      if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
      return value;
    };

    const applyContatoMask = (value) => {
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
      if (name === "contato") maskedValue = applyContatoMask(value);

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
            showToast.success("Informações atualizadas com sucesso!");
          } catch (error) {
            t.error("Erro ao salvar alterações:", error);
            throw new Error("Erro ao salvar alterações. Tente novamente.");
          }
        })(),
        {
          loading: "Salvando alterações...",
          success: "Informações atualizadas com sucesso!",
          error: "Erro ao salvar alterações.",
        },
        {
          style: ToastStyle,
        }
      );
    };

    return (
      <section id="edit_section" className="flex w-full justify-between">
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
                    value={formData.tipoCliente} // Certificar-se de que o valor está correto
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
                text="E-mail"
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
                text="Contato"
                type="text"
                name="contato"
                value={formData.contato}
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
                options={statusOptions}
                handleOnChange={handleInputChange}
                value={formData.ativo.toString()} // Convert boolean to string for proper matching
              />
            </li>
          </ul>
          <div className="flex mt-6">
            <PrimaryButton
              id="button_confirm_edit"
              text="Salvar Alterações"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
        <DeleteButton
          id="delete_button"
          text="Deletar Usuário"
          onClick={() => setIsDeleteModalOpen(true)}
        />

        <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
          title={"Deletar Usuário"}
          description={"Tem certeza de que deseja deletar este usuário?"}
        />
      </section>
    );
  }
  //Fim da função edit

  // Função para renderizar o conteúdo baseado no filtro selecionado
  const renderContent = () => {
    switch (filterScreen) {
      case "1":
        return isEditing ? ( // Modo edição ativo
          <Edit setIsEditing={setIsEditing} />
        ) : (
          <>
            <section id="info_section" className="flex w-full justify-between">
              <div className="flex flex-col">
                <h1 className="text-[42px]">
                  <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.nome}
                </h1>
                <span className="text-[18px]">Altere as informações</span>
                <ul className="flex flex-col mt-6 gap-2">
                  {isClient && (
                    <li>
                      <b>Tipo de Cliente: </b> {user?.tipoCliente}
                    </li>
                  )}
                  <li>
                    <b>E-mail: </b> {user?.email}
                  </li>
                  <li>
                    <b>CPF: </b> {user?.cpf}
                  </li>
                  <li>
                    <b>Contato: </b> {user?.contato}
                  </li>
                  <li>
                    <b>Status: </b> {user?.ativo ? "Ativo" : "Inativo"}
                  </li>
                </ul>
              </div>

              <div className="flex justify-between flex-col">
                {/* Botão de editar */}
                <PrimaryButton
                  id="button_edit"
                  text="Editar Usuário"
                  onClick={() => setIsEditing(true)}
                />
              </div>
            </section>
          </>
        );

      case "2":
        return (
          <div>
            <h1 className="text-[42px]">
              <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.nome}
            </h1>
            <Dropdown
              title="Serviços"
              content={
                <section>
                  <div className="flex justify-end">
                    <RegisterButton 
                      id="register_button"
                      title="Registrar subserviço"
                      text="+"
                      onClick={() => registerRedirect(navigate)} 
                      />
                  </div>
                    <div className="gap-6 flex justify-center mt-12 max-h-[600px] overflow-y-auto w-full h-auto ">
                  {filteredJobs != null ? filteredJobs : <p className="text-center text-gray-400">Aqui ficam os serviços do usuário.</p>}
                    </div>
                  </section>}
                  />
                </div>
        );

      case "3":
        return (
          <div className="flex justify-center mt-6 bg-[#1E1E1E90] p-4">
            <div className="flex flex-col">
              <h1 className="text-[42px]">
                <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.nome}
              </h1>
              <ul className="flex flex-col mt-6 gap-2">
                {isClient && (
                  <li>
                    <b>Tipo de Cliente: </b> {user?.tipoCliente}
                  </li>
                )}
                <li>
                  <b>E-mail: </b> {user?.email}
                </li>
                <li>
                  <b>CPF: </b> {user?.cpf}
                </li>
                <li>
                  <b>Contato: </b> {user?.contato}
                </li>
                <li>
                  <b>Status: </b> {user?.ativo ? "Ativo" : "Inativo"}
                </li>
              </ul>
            </div>
            <LineGrafic />
          </div>
        );

      default:
        return (
          <p className="text-center text-gray-400">
            Selecione um filtro válido.
          </p>
        );
    }
  };

  return (
    <div className="w-full mt-3">
      <ScreenFilter onFilterChange={setFilterScreen} />
      {renderContent()}
    </div>
  );
};

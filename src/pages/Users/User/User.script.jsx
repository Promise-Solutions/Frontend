import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext.jsx";
import PrimaryButton from "../../../components/buttons/primaryButton/PrimaryButton.jsx";
import { useJobContext } from "../../../context/JobContext.jsx";
import { showToast, ToastStyle } from "../../../components/toastStyle/ToastStyle.jsx";
import Select from "../../../components/form/Select.jsx";
import Input from "../../../components/form/Input.jsx";
import DeleteButton from "../../../components/buttons/deleteButton/DeleteButton.jsx";
import Dropdown from "../../../components/dropdown/Dropdown.jsx";
import ModalConfirmDelete from "../../../components/modals/modalConfirmDelete/ModalConfirmDelete.jsx";
import ScreenFilter from "../../../components/filters/screenFilter/ScreenFilter.jsx";
import FreqPagGraphic from "../../../components/graphic/FreqPagGraphic.jsx";
import React from "react";
import CardJob from "../../../components/cards/cardJob/CardJob.jsx";
import toast from "react-hot-toast"; // Add this import
import { useNavigate, useParams } from "react-router-dom";
import RegisterButton from "../../../components/buttons/registerButton/RegisterButton.jsx";
import SecondaryButton from "../../../components/buttons/secondaryButton/SecondaryButton.jsx";
import Table from "../../../components/tables/Table.jsx";
import { axiosProvider } from "../../../provider/apiProvider";
import { getCategoryTranslated, getServiceTypeTranslated, getStatusTranslated } from "../../../hooks/translateAttributes.js";

export const RenderInfos = () => {
  const { userParam } =  useParams();
  const { user, setUser, userId, isClient } = useUserContext(); // Contexto do usuário
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla o modal de exclusão
  const [filterScreen, setFilterScreen] = useState("1"); // Controla o filtro de tela
  const { findJobsByClientId } = useJobContext();
  const [tableData, setTableData] = useState({});
  const navigate = useNavigate();

  // Função para deletar usuário
  const handleDeleteUser = async () => {
    try {
      // Proceed with deletion
      const endpoint = isClient ? `/clients/${userId}` : `/employees/${userId}`;
      await axiosProvider.delete(endpoint);
      showToast.success("Usuário deletado com sucesso!", { style: ToastStyle });
      navigate("/users");
    } catch (error) {
      showToast.error("Erro ao deletar usuário. Tente novamente.", {
        style: ToastStyle,
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const renderJobs = async () => {
    const jobsRendered = await findJobsByClientId(userParam)

    setFilteredJobs(jobsRendered);
  };

  const tableHeader = [
    { label: "ID", key: "id" },
    { label: "Titulo", key: "title" },
    { label: "Categoria", key: "category" },
    { label: "Tipo do Serviço", key: "serviceType" },
    { label: "Status", key: "status" },
    { label: "Ação", key: "action" },
  ];

  const registerRedirect = (navigate) => {
    navigate("/register/jobs");
  };

  useEffect(() => {
    renderJobs();
  }, [userParam]);

  useEffect(() => {
    const dataFiltered = filteredJobs.map((job) => {
      
      return {
        id: job.id,
        title: job.title,
        category: getCategoryTranslated(job.category),
        serviceType: getServiceTypeTranslated(job.serviceType),
        status: getStatusTranslated(job.status),
        action: React.createElement(PrimaryButton, {
          id: "access_button",
          text: "Acessar",
          onClick: () => {
            navigate(`/jobs/${job.id}`);
          },
        }),
      };
    });

    setTableData(dataFiltered);
  }, [filteredJobs]);

  function Edit() {
    const [formData, setFormData] = useState({
      name: user?.name || "",
      cpf: user?.cpf || "",
      email: user?.email || "",
      contact: user?.contact || "",
      clientType: user?.clientType || "", // Garantir que o valor inicial seja do banco
      active: user?.active, // Garantir que o valor inicial seja booleano
      password: "",
    });

    const clienteOptions = [
      { id: "SINGLE", name: "Avulso" },
      { id: "MONTHLY", name: "Mensal" },
    ];

    const statusOptions = [
      { id: "true", name: "Ativo" }, // Use strings "true" and "false" for consistency
      { id: "false", name: "Inativo" },
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const parsedValue = name === "active" ? value === "true" : value; // Convert "ativo" to boolean
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
              name: formData.name.toUpperCase(),
              contact: formData.contact, // Atualizado para 'contact'
            };

            if (!formData.password) delete updatedFormData.password;
            if (!isClient) delete updatedFormData.clientType;

            const endpoint = isClient
              ? `/clients/${userId}`
              : `/employees/${userId}`;
            await axiosProvider.patch(endpoint, updatedFormData);

            setUser({ ...user, ...updatedFormData });
            setIsEditing(false);
            showToast.success("Informações atualizadas com sucesso!");
          } catch (error) {
            toast.error("Erro ao salvar alterações:", error);
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
                    name="clientType"
                    options={clienteOptions}
                    handleOnChange={handleInputChange}
                    value={formData.clientType} // Certificar-se de que o valor está correto
                  />
                </li>
              </>
            ) : null}
            <li>
              <Input
                text="Nome"
                type="text"
                name="nome"
                value={formData.name}
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
                value={formData.contact}
                handleOnChange={handleMaskedInputChange}
              />
            </li>
            {!isClient ? (
              <li>
                <Input
                  text="Senha"
                  type="text"
                  name="senha"
                  value={formData.password}
                  handleOnChange={handleInputChange}
                />
              </li>
            ) : null}
            <li>
              <Select
                text="Status"
                name="active"
                options={statusOptions}
                handleOnChange={handleInputChange}
                value={formData.active?.toString()} // Convert boolean to string for proper matching
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
        <div className="flex flex-col gap-5">
          <DeleteButton
            id="delete_button"
            text="Deletar Usuário"
            onClick={() => setIsDeleteModalOpen(true)}
          />

          <PrimaryButton
            id="button_cancel_job_edit"
            text="Cancelar Alterações"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className="!border-[#C5C5C5] !text-[#C5C5C5] hover:!border-cyan-zero hover:!text-cyan-zero"
          />
        </div>

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
    if (!user) {
      return (
        <p className="text-center text-gray-400">
          Carregando informações do usuário...
        </p>
      );
    }

    switch (filterScreen) {
      case "1":
        return isEditing ? (
          <Edit setIsEditing={setIsEditing} />
        ) : (
          <section id="info_section" className="flex w-full justify-between">
            <div className="flex flex-col">
              <h1 className="text-[42px]">
                <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.name}
              </h1>
              <ul className="flex flex-col mt-6 gap-2">
                {isClient && (
                  <li>
                    <b>Tipo de Cliente: </b>{" "}
                    {user?.clientType == "SINGLE" ? "Avulso" : "Mensal"}
                  </li>
                )}
                <li>
                  <b>E-mail: </b> {user?.email}
                </li>
                <li>
                  <b>CPF: </b> {user?.cpf}
                </li>
                <li>
                  <b>Contato: </b> {user?.contact}
                </li>
                <li>
                  <b>Status: </b> {user?.active ? "Ativo" : "Inativo"}
                </li>
              </ul>
            </div>
            <div className="flex justify-between flex-col">
              <PrimaryButton
                id="button_edit"
                text="Editar Usuário"
                onClick={() => setIsEditing(true)}
              />
            </div>
          </section>
        );

      case "2":
        return (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[42px]">
                <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.name}
              </h1>
              <div className="flex justify-end">
                <RegisterButton
                  id="register_button"
                  title="Registrar Serviço"
                  text="+"
                  onClick={() => registerRedirect(navigate)}
                />
              </div>
            </div>
            <section>
              <div className="flex justify-center">
                <Table headers={tableHeader} data={tableData} />
              </div>
            </section>
          </div>
        );

      case "3":
        return (
          <div className="flex justify-center mt-6 bg-[#1E1E1E90] p-4">
            <div className="flex flex-col">
              <h1 className="text-[42px]">
                <b>{isClient ? "Cliente: " : "Funcionário: "}</b> {user?.name}
              </h1>
              <ul className="flex flex-col mt-6 gap-2">
                {isClient && (
                  <li>
                    <b>Tipo de Cliente: </b>{" "}
                    {user?.clientType == "SINGLE" ? "Avulso" : "Mensal"}
                  </li>
                )}
                <li>
                  <b>E-mail: </b> {user?.email}
                </li>
                <li>
                  <b>CPF: </b> {user?.cpf}
                </li>
                <li>
                  <b>Contato: </b> {user?.contact}
                </li>
                <li>
                  <b>Status: </b> {user?.active ? "Ativo" : "Inativo"}
                </li>
              </ul>
            </div>
            <FreqPagGraphic />
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

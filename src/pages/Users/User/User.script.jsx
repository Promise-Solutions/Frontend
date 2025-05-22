import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/UserContext.jsx";
import PrimaryButton from "../../../components/buttons/primaryButton/PrimaryButton.jsx";
import { useJobContext } from "../../../context/JobContext.jsx";
import {
  showToast,
  ToastStyle,
} from "../../../components/toastStyle/ToastStyle.jsx";
import Select from "../../../components/form/Select.jsx";
import Input from "../../../components/form/Input.jsx";
import DeleteButton from "../../../components/buttons/deleteButton/DeleteButton.jsx";
import ModalConfirmDelete from "../../../components/modals/modalConfirmDelete/ModalConfirmDelete.jsx";
import ScreenFilter from "../../../components/filters/screenFilter/ScreenFilter.jsx";
import Kpi from "../../../components/graphic/Kpi.jsx";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegisterButton from "../../../components/buttons/registerButton/RegisterButton.jsx";
import Table from "../../../components/tables/Table.jsx";
import { axiosProvider } from "../../../provider/apiProvider";
import {
  getCategoryTranslated,
  getServiceTypeTranslated,
  getStatusTranslated,
} from "../../../hooks/translateAttributes.js";
import CancelButton from "../../../components/modals/modalConfirmDelete/cancelButton.jsx";
import { ROUTERS } from "../../../constants/routers.js";
import { formatDateWithoutTime } from "../../../hooks/formatUtils.js";
import { SyncLoader } from "react-spinners";

export const RenderInfos = () => {
  const { userParam } = useParams();
  const { user, setUser, userId, isClient } = useUserContext(); // Contexto do usuário
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla o modal de exclusão
  const [filterScreen, setFilterScreen] = useState("1"); // Controla o filtro de tela
  const { findJobsByClientId } = useJobContext();
  const [tableData, setTableData] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Função para deletar usuário
  const handleDeleteUser = async () => {
    try {
      // Proceed with deletion
      const endpoint = isClient ? `/clients/${userId}` : `/employees/${userId}`;
      await axiosProvider.delete(endpoint);
      showToast.success("Usuário deletado com sucesso!", { style: ToastStyle });
      navigate(ROUTERS.USERS);
    } catch (error) {
      showToast.error("Erro ao deletar usuário. Tente novamente.", {
        style: ToastStyle,
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const renderJobs = async () => {
    const jobsRendered = await findJobsByClientId(userParam);

    setFilteredJobs(jobsRendered);
  };

  const tableHeader = [
    { label: "Titulo", key: "title" },
    { label: "Categoria", key: "category" },
    { label: "Tipo do Serviço", key: "serviceType" },
    { label: "Valor Total (R$)", key: "totalValue" },
    { label: "Status", key: "status" },
    { label: "Ação", key: "action" },
  ];

  const registerRedirect = (navigate, userParam) => {
    navigate(ROUTERS.getUserJobRegister(userParam));
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
        totalValue: `R$ ${job.totalValue.toFixed(2).replace(".", ",")}`,
        status: getStatusTranslated(job.status),
        action: React.createElement(PrimaryButton, {
          id: "access_button",
          text: "Acessar",
          onClick: () => {
            navigate(ROUTERS.getJobDetail(job.id));
          },
        }),
      };
    });

    setTableData(dataFiltered);
    setIsLoading(false);
  }, [filteredJobs]);

  useEffect(() => {
    if (userId) {
      axiosProvider
        .get(`dashboard/client-stats/${userId}`)
        .then((response) => {
          console.log("Estatísticas do usuário:", response.data);
          if (response.data != null) {
            setData([
              {
                name: "Frequência",
                value: response.data.frequency,
              },
              {
                name: "ValorEmBar",
                value: response.data.totalCommandsValue,
              },
              {
                name: "ValorEmServiços",
                value: response.data.totalValue,
              },
              {
                name: "TicketMédio",
                value:
                  (response.data.totalValue +
                    response.data.totalCommandsValue) /
                  response.data.frequency,
              },
            ]);
          } else {
            toast.error("Nenhum dado encontrado para o usuário.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar estatísticas do usuário:", error);
        });
    }
  }, [userId]);

  function Edit() {
    const [formData, setFormData] = useState({
      name: user?.name || "",
      cpf: user?.cpf || "",
      email: user?.email || "",
      contact: user?.contact || "",
      clientType: user?.clientType || "",
      active: user?.active,
      password: "",
      createdDate: user?.createdDate || "",
    });

    const clienteOptions = [
      { id: "SINGLE", name: "Avulso" },
      { id: "MONTHLY", name: "Mensal" },
    ];

    const statusOptions = [
      { id: "true", name: "Ativo" },
      { id: "false", name: "Inativo" },
    ];

    // Máscara de CPF
    const handleCpfChange = (e) => {
      let value = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
      setFormData((prev) => ({ ...prev, cpf: value }));
    };

    // Máscara de contato
    const handleContatoChange = (e) => {
      let value = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (value.length > 0) value = "(" + value;
      if (value.length > 3) value = value.slice(0, 3) + ") " + value.slice(3);
      if (value.length > 10) value = value.slice(0, 10) + "-" + value.slice(10);
      setFormData((prev) => ({ ...prev, contact: value }));
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const parsedValue = name === "active" ? value === "true" : value;
      setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    const validarEmail = () => {
      const email = formData.email;
      const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
      if (!email.trim()) {
        showToast.error("O campo de email está vazio.");
        return false;
      }
      if (!regex.test(email)) {
        showToast.error("O email inserido é inválido.");
        return false;
      }
      return true;
    };

    const handleSaveChanges = async () => {
      let cpf = formData.cpf;
      let contact = formData.contact;

      if (!formData.name) {
        showToast.error("Nome é obrigatório.");
        return;
      } else if (!validarEmail()) {
        showToast.error("E-mail é obrigatório.");
        return;
      } else if (!formData.cpf || cpf.length < 14) {
        showToast.error("CPF deve ter 14 caracteres.");
        return;
      } else if (!formData.contact || contact.length < 15) {
        showToast.error("Contato deve ter 15 caracteres.");
        return;
      } else {
        await showToast.promise(
          (async () => {
            try {
              const updatedFormData = {
                ...formData,
                name: formData.name.toUpperCase(),
                contact: formData.contact,
              };

              if (!formData.password) delete updatedFormData.password;
              if (!isClient) delete updatedFormData.clientType;

              const endpoint = isClient
                ? `/clients/${userId}`
                : `/employees/${userId}`;
              console.log("Dados atualizados:", updatedFormData);
              await axiosProvider.patch(endpoint, updatedFormData);

              setUser({ ...user, ...updatedFormData });
              setIsEditing(false);
              showToast.success("Informações atualizadas com sucesso!");
            } catch (error) {
              showToast.error("Erro ao salvar alterações:", error);
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
      }
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
              <li>
                <Select
                  text="Tipo de Cliente"
                  name="clientType"
                  required
                  options={clienteOptions}
                  handleOnChange={handleInputChange}
                  value={formData.clientType}
                />
              </li>
            ) : null}
            <li>
              <Input
                text="Nome"
                type="text"
                name="name"
                required
                value={formData.name}
                handleOnChange={handleInputChange}
              />
            </li>
            <li>
              <Input
                text="E-mail"
                type="email"
                name="email"
                required
                value={formData.email}
                handleOnChange={handleInputChange}
              />
            </li>
            <li>
              <Input
                text="CPF"
                type="text"
                name="cpf"
                required
                value={formData.cpf}
                handleOnChange={handleCpfChange}
                maxLength="14"
              />
            </li>
            <li>
              <Input
                text="Contato"
                type="text"
                name="contact"
                required
                value={formData.contact}
                handleOnChange={handleContatoChange}
                maxLength="15"
              />
            </li>
            <Input
              type="date"
              text="Data de Nascimento"
              name="dataNascimento"
              required
              placeholder="Digite o valor"
              handleOnChange={handleInputChange}
              value={formData.date}
              min="1900-12-31"
              max={new Date().toLocaleDateString("en-CA")}
              className="custom-calendar"
            />
            {!isClient ? (
              <li>
                <Input
                  text="Senha"
                  type="text"
                  name="password"
                  required
                  value={formData.password}
                  handleOnChange={handleInputChange}
                />
              </li>
            ) : null}
            <li>
              <Select
                text="Status"
                name="active"
                required
                options={statusOptions}
                handleOnChange={handleInputChange}
                value={formData.active?.toString()}
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

          <CancelButton
            id="button_cancel_job_edit"
            text="Cancelar Alterações"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
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
      return <p>Carregando informações do usuário...</p>;
    }

    if (isEditing) {
      return <Edit />;
    }

    switch (filterScreen) {
      case "1":
        return isEditing ? (
          <Edit setIsEditing={setIsEditing} />
        ) : (
          <section
            id="info_section"
            className="flex w-full flex-col justify-between"
          >
            <div className="flex justify-between">
              <div>
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
                    <b>Data de Nascimento: </b> {formatDateWithoutTime(user?.birthDay)}
                  </li>
                  <li>
                    <b>Status: </b> {user?.active ? "Ativo" : "Inativo"}
                  </li>
                  <li>
                    <b>Desde: </b>
                    {user?.createdDate
                      ? formatDateWithoutTime(user.createdDate)
                      : "Não foi possível carregar a data"}
                  </li>
                </ul>
              </div>
              <div>
                <PrimaryButton
                  id="button_edit"
                  text="Editar Usuário"
                  onClick={() => setIsEditing(true)}
                />
              </div>
            </div>

            {data.length >= 4 && (
              <div className="flex h-28 gap-4 justify-center mt-4 w-full">
                <Kpi
                  title={data[0].name && "Frequência Total"}
                  value={
                    data[0].value > 0 ? `${data[0].value}` : "Sem Frequência"
                  }
                />
                <Kpi
                  title={data[1].name && "Total Gasto em Bar"}
                  value={
                    data[1].value > 0 ? `R$ ${data[1].value}` : "Sem Gastos"
                  }
                />
                <Kpi
                  title={data[2].name && "Total Gasto em Serviços"}
                  value={
                    data[2].value > 0 ? `R$ ${data[2].value}` : "Sem Gastos"
                  }
                />
                <Kpi
                  title={data[3].name && "Ticket Médio"}
                  value={
                    data[3].value > 0
                      ? `R$ ${data[3].value}`
                      : "Sem Ticket Médio"
                  }
                />
              </div>
            )}
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
                  onClick={() => registerRedirect(navigate, userParam)}
                />
              </div>
            </div>
            <section>
              <div className="flex justify-center">
                <Table
                  headers={tableHeader}
                  data={tableData}
                  elementMessageNotFound="serviço"
                />
              </div>
            </section>
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
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full mt-[8rem]">
          <SyncLoader
            size={8}
            loading={true}
            color={"#02AEBA"}
            speedMultiplier={2}
          />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

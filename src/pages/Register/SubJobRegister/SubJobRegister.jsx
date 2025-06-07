import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import { useSubJobContext } from "../../../context/SubJobContext";
import { useEffect, useState } from "react";
import { registrarSubServico } from "./SubJobRegister.script";
import { useNavigate, useParams } from "react-router-dom";
import Select from "../../../components/form/Select";
import Checkbox from "../../../components/form/Checkbox";
import { showToast } from "../../../components/toastStyle/ToastStyle";
import { ROUTERS } from "../../../constants/routers";
import { getNumericValue } from "../../../hooks/formatUtils";

const SubJobRegister = () => {
  const { saveSubJob } = useSubJobContext();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    date: "",
    fkService: jobId,
    needsRoom: false,
    startTime: null,
    expectedEndTime: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputCheckboxChange = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subJobDataToRegister = {
      ...formData,
      value: getNumericValue(formData.value),
    };

    const responseCode = await registrarSubServico(
      subJobDataToRegister,
      saveSubJob
    );

    if (responseCode == 201) {
      setTimeout(() => {
        navigate(ROUTERS.getJobDetail(jobId));
      }, 700);
    }
  };

  const handleValorChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9.,]/g, "");

    let newValue = value.replace(".", ",")

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  return (
    <main className="slide-in-ltr flex items-center justify-center h-[600px] my-6 w-full px-16">
      <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
        <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
        <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
          Registre um novo Subserviço
        </h1>
      </section>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col items-center justify-center gap-10 w-full h-full px-4"
      >
        <section
          id="form_cliente"
          className="flex flex-wrap items-center justify-between w-full gap-4"
        >
          <Input
            type="text"
            text="Titulo"
            required
            name="title"
            placeholder="Digite o titulo"
            handleOnChange={handleInputChange}
            value={formData.title}
            maxLength="50"
          />
          <Input
            type="text"
            text="Descrição"
            required
            name="description"
            placeholder="Digite a descrição"
            handleOnChange={handleInputChange}
            value={formData.description}
            maxLength={200}
          />
          <Input
            type="tel"
            text="Valor (R$)"
            required
            name="value"
            placeholder="Digite o valor"
            handleOnChange={handleValorChange}
            value={formData.value === NaN ? null : formData.value}
            maxLength="50"
          />
          <Checkbox
            text="Utilizará a Sala?"
            required
            name="needsRoom"
            handleOnChange={handleInputCheckboxChange}
            value={formData.needsRoom}
          />
          <Input
            type="date"
            text="Data prevista para subserviço"
            name="date"
            placeholder="Digite o valor"
            handleOnChange={handleInputChange}
            value={formData.date}
            min={new Date().toLocaleDateString("en-CA")}
            max="2099-12-31"
            className="custom-calendar"
          />
          <div className="flex items-center justify-between w-full gap-8">
            <Input
              type="time"
              text="Horário de início"
              name="startTime"
              placeholder="Digite o valor"
              handleOnChange={handleInputChange}
              value={formData.startTime}
              className="custom-calendar"
            />

            <Input
              type="time"
              text="Horário previsto de conclusão"
              name="expectedEndTime"
              placeholder="Digite o valor"
              handleOnChange={handleInputChange}
              value={formData.expectedEndTime}
              className="custom-calendar"
            />
          </div>
        </section>

        <SubmitButton text="Confirmar" />
      </form>
    </main>
  );
};

export default SubJobRegister;

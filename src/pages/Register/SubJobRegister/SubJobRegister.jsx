import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import { useSubJobContext } from "../../../context/SubJobContext";
import {  useState } from "react";
import { registrarSubServico } from "./SubJobRegister.script";
import { useNavigate, useParams } from "react-router-dom";
import Checkbox from "../../../components/form/Checkbox";
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
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatEndDate, setRepeatEndDate] = useState("");

  const weekDays = [
    { value: 0, label: "Dom" },
    { value: 1, label: "Seg" },
    { value: 2, label: "Ter" },
    { value: 3, label: "Qua" },
    { value: 4, label: "Qui" },
    { value: 5, label: "Sex" },
    { value: 6, label: "Sáb" },
  ];
  const handleRepeatDayChange = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

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
      value: getNumericValue(formData.value)
    };

    // Se não for repetição, fluxo normal
    if (!repeatWeekly) {
      const responseCode = await registrarSubServico(
        subJobDataToRegister,
        saveSubJob
      );
      if (responseCode == 201) {
        setTimeout(() => {
          navigate(ROUTERS.getJobDetail(jobId));
        }, 700);
      }
      return;
    }

    // Se for repetição semanal
    if (repeatWeekly && repeatDays.length > 0 && repeatEndDate) {
      const startDate = new Date(formData.date);
      const endDate = new Date(repeatEndDate);
      let current = new Date(startDate);
      let createdAny = false;

      while (current <= endDate) {
        if (repeatDays.includes(current.getDay())) {
          const payload = {
            ...subJobDataToRegister,
            date: current.toISOString().slice(0, 10),
          };
          // Verifica conflito antes de criar (implemente sua lógica de backend aqui)
          const conflict = false; // await checkSubJobConflict(payload);
          if (!conflict) {
            await registrarSubServico(payload, saveSubJob);
            createdAny = true;
          }
        }
        current.setDate(current.getDate() + 1);
      }
      if (createdAny) {
        setTimeout(() => {
          navigate(ROUTERS.getJobDetail(jobId));
        }, 700);
      }
      return;
    }
  };

  const handleValorChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9.,]/g, "");

    let newValue = value.replace(".", ",");

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
        className="flex flex-col items-center justi w-full h-full px-4"
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
          <Checkbox
            text="Utilizará a Sala?"
            required
            name="needsRoom"
            handleOnChange={handleInputCheckboxChange}
            value={formData.needsRoom}
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

          <div className="flex flex-col gap-2 mt-2 w-full">
            <Checkbox
              text={<span className="text-white">Repetir semanalmente</span>}
              name="repeatWeekly"
              value={repeatWeekly}
              handleOnChange={() => setRepeatWeekly((v) => !v)}
            />
            {repeatWeekly && (
              <>
                <div className="flex flex-col gap-0 mt-0 w-full">
                  <span className="text-white text-sm mb-0 leading-tight">
                    Dias:
                  </span>
                  <div className="flex flex-row gap-0.5">
                    {weekDays.map((d) => (
                      <Checkbox
                        key={d.value}
                        text={
                          <span className="text-white text-xs">{d.label}</span>
                        }
                        name={`repeatDay_${d.value}`}
                        value={repeatDays.includes(d.value)}
                        handleOnChange={() => handleRepeatDayChange(d.value)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-0.5">
                  <span className="text-white text-sm mr-2">Até:</span>
                  <input
                    type="date"
                    value={repeatEndDate}
                    min={
                      formData.date || new Date().toLocaleDateString("en-CA")
                    }
                    onChange={(e) => setRepeatEndDate(e.target.value)}
                    className="ml-1 border rounded px-2 py-1 bg-transparent text-white"
                    style={{ borderColor: "#5f6176" }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <SubmitButton text="Confirmar" />
          </div>
        </section>
      </form>
    </main>
  );
};

export default SubJobRegister;

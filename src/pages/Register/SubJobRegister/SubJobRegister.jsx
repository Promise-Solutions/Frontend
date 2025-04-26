import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import { useSubJobContext } from "../../../context/SubJobContext";
import { useState } from "react";
import { registrarSubServico } from "./SubJobRegister.script";
import { useNavigate, useParams } from "react-router-dom";

const SubJobRegister = () => {
    const { saveSubJob } = useSubJobContext();
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        value: "",
        date: "",
        fkService: jobId
      });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      

      setFormData((prevData) => ({
        ...prevData,
        value: getNumericValue(prevData.value)
      }))

      const responseCode = await registrarSubServico(formData, saveSubJob)

      if(responseCode == 201) {
        setTimeout(() => {
          navigate(`/jobs/${jobId}`)
        }, 700)
      }
    };

    const handleValorChange = (e) => {
      let { name, value } = e.target;

      value = value.replace(/[^0-9,]/g, "");

      let newValue = value

      const partes = newValue.split(",");
      if (partes.length > 2) {
        newValue = partes[0] + "," + partes.slice(1).join("");
      }
      
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    };
  
    const getNumericValue = (valueString) => {
      if(typeof valueString === "string" && valueString.includes(",")) {
        valueString = valueString.replace(",", ".");
      }
      return parseFloat(valueString);
    };


    return(
        <main className="flex items-center justify-center h-[600px] my-6 w-full px-16">
          <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
            <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
            <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
              Registre um novo Subservico
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
                  name="title"
                  placeholder="Digite o titulo"
                  handleOnChange={handleInputChange}
                  value={formData.title}
                  maxLength="50"
                />
                <Input
                  type="text"
                  text="Descrição"
                  name="description"
                  placeholder="Digite a descrição"
                  handleOnChange={handleInputChange}
                  value={formData.description}
                  maxLength="50"
                />
                <Input
                  type="tel"
                  text="Valor (R$)"
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
                  value={`${formData.date}`}
                  min={new Date().toLocaleDateString("en-CA")}
                  max="2099-12-31"
                  className="custom-calendar"
                />
              
              </section>
        
          <SubmitButton text="Confirmar" />
        </form>
      </main>
    );
}

export default SubJobRegister
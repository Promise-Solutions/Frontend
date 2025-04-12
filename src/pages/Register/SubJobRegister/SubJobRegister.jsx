import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import SubmitButton from "../../../components/form/SubmitButton";
import { useSubJobContext } from "../../../context/SubJobContext";
import { useState } from "react";
import { registrarSubServico } from "./SubJobRegister.script";

const SubJobRegister = () => {
    const { saveSubJob } = useSubJobContext();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === "tipo") setSelectedType(value); // Update selectedType when user type changes
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        formData.valor = getNumericValue(formData.valor);
        console.log(formData)

        registrarSubServico(formData, saveSubJob)
      };

      const handleQuantidadeChange = (e) => {
        let { name, value } = e.target;

        value = value.replace(/\D/g, "")
        
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === "tipo") setSelectedType(value); // Update selectedType when user type changes
      }

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
        console.log(typeof valueString)

        if(typeof valueString === "string" && valueString.includes(",")) {
          valueString = valueString.replace(",", ".");
        }
        return parseFloat(valueString);
      };


      const [formData, setFormData] = useState({
          titulo: "",
          descricao: "",
          quantidade: "",
          valor: "",
          dataPrevista: ""
        });
      
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
                  name="titulo"
                  placeholder="Digite o titulo"
                  handleOnChange={handleInputChange}
                  value={formData.titulo}
                  maxLength="50"
                />
                <Input
                  type="text"
                  text="Descrição"
                  name="descricao"
                  placeholder="Digite a descrição"
                  handleOnChange={handleInputChange}
                  value={formData.descricao}
                  maxLength="50"
                />
                <Input
                  type="text"
                  text="Quantidade"
                  name="quantidade"
                  placeholder="Digite a quantidade"
                  handleOnChange={handleQuantidadeChange}
                  value={formData.quantidade}
                  maxLength="50"
                />
                <Input
                  type="tel"
                  text="Valor (R$)"
                  name="valor"
                  placeholder="Digite o valor"
                  handleOnChange={handleValorChange}
                  value={formData.valor === NaN ? null : formData.valor}
                  maxLength="50"
                  className=""
                />
                <Input
                  type="date"
                  text="Data prevista para serviço"
                  name="dataPrevista"
                  placeholder="Digite o valor"
                  handleOnChange={handleInputChange}
                  value={`${formData.dataPrevista}`}
                  min={new Date().toISOString().split("T")[0]}
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
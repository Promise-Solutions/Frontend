import SelectTypeUser from "../../../components/form/SelectTypeUser";
import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import SubmitButton from "../../../components/form/SubmitButton";
import { useJobContext } from "../../../context/JobContext";
import { useEffect, useState } from "react";
import { registrarServico, createClientsOptions } from "./JobRegister.script";
import { useUserContext } from "../../../context/UserContext";

const JobRegister = () => {
    const [clientOptions, setClientOptions] = useState([]);
    const { findClients } = useUserContext();

    useEffect(() => {
      renderClientOptions();
    },[])

    const renderClientOptions = async () => {
      const clients = await createClientsOptions(findClients);

       const nameClients = clients.map(client => {
          const clientObj = {
            id: client.id,
            name: client.nome
          }
          return clientObj
       });


       setClientOptions(nameClients);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === "tipo") setSelectedType(value); // Update selectedType when user type changes
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        registrarServico(formData, saveJob);
      };

      const { saveJob } = useJobContext();

      const [formData, setFormData] = useState({
          titulo: "",
          categoria: "",
          tipoServico: "",
          fkCliente: null
        });

      const categoryOptions = [
        {id: "Ensaio Musical", name: "Ensaio Musical"},
        {id: "Podcast", name: "Podcast"},
        {id: "Estudio Fotografico", name: "Estúdio Fotográfico"}
      ] 

      const typeOptions = [
        {id: "AVULSO", name: "Avulso"},
        {id: "MENSAL", name: "Mensal"}
      ]
      
    return(
        <main className="flex items-center justify-center h-[600px] my-6 w-full px-16">
          <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
            <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
            <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
              Registre um novo Servico
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
                <Select
                  text="Categoria de Servico"
                  name="categoria"
                  options={categoryOptions}
                  handleOnChange={handleInputChange}
                  value={formData.categoria}
                />
                <Select
                  text="Tipo de serviço"
                  name="tipoServico"
                  options={typeOptions}
                  handleOnChange={handleInputChange}
                  value={formData.tipoServico}
                />
                <Select
                  text="Cliente Desejado"
                  name="fkCliente"
                  options={clientOptions}
                  handleOnChange={handleInputChange}
                  value={formData.fkCliente}
                />
              
              </section>
        
          <SubmitButton text="Confirmar" />
        </form>
      </main>
    );
}

export default JobRegister
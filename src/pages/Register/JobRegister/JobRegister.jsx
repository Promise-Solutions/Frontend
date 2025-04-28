import SelectTypeUser from "../../../components/form/SelectTypeUser";
import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import SubmitButton from "../../../components/form/SubmitButton";
import { useJobContext } from "../../../context/JobContext";
import { useEffect, useState } from "react";
import { registrarServico, createClientsOptions } from "./JobRegister.script";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const JobRegister = () => {
    const { userParam } = useParams();
    const [clientOptions, setClientOptions] = useState([]);
    const { findClients } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
      renderClientOptions();
    },[])

    const renderClientOptions = async () => {
      const clients = await createClientsOptions(findClients);


       const nameClients = clients.map(client => {
          const clientObj = {
            id: client.id,
            name: client.name
          }
          return clientObj
       });

       console.log("clients", nameClients)
       setClientOptions(nameClients);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const responseCode = await registrarServico(formData, saveJob);

        if(responseCode == 201) {
          navigate(-1);
        }
      };

      const { saveJob } = useJobContext();

      const [formData, setFormData] = useState({
          title: "",
          category: "",
          serviceType: "",
          fkClient: userParam? userParam : null
        });

      const categoryOptions = [
        {id: "MUSIC_REHEARSAL", name: "Ensaio Musical"},
        {id: "PODCAST", name: "Podcast"},
        {id: "PHOTO_VIDEO_STUDIO", name: "Estúdio Fotográfico"}
      ] 

      const typeOptions = [
        {id: "SINGLE", name: "Avulso"},
        {id: "MONTHLY", name: "Mensal"}
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
                  name="title"
                  placeholder="Digite o titulo"
                  handleOnChange={handleInputChange}
                  value={formData.title}
                  maxLength="50"
                />
                <Select
                  text="Categoria de Servico"
                  name="category"
                  options={categoryOptions}
                  handleOnChange={handleInputChange}
                  value={formData.category}
                />
                <Select
                  text="Tipo de serviço"
                  name="serviceType"
                  options={typeOptions}
                  handleOnChange={handleInputChange}
                  value={formData.serviceType}
                />
                <Select
                  text="Cliente Desejado"
                  name="fkClient"
                  options={clientOptions}
                  handleOnChange={handleInputChange}
                  value={formData.fkClient}
                />
              </section>
        
          <SubmitButton text="Confirmar" />
        </form>
      </main>
    );
}

export default JobRegister
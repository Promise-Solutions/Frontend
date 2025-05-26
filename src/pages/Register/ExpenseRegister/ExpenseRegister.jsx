import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import SubmitButton from "../../../components/form/SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { axiosProvider } from "../../../provider/apiProvider";

const ExpenseRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            expenseDetail: "",
            amountExpend: "",
            date: "",
            expenseCategory: "",
            paymentType: "",
            quantity: ""
    });

    const [productOptions, setProductOptions] = useState([{id: null, name: "<Não encontrado>", disabled: true}]);
        
    const expenseCategoryOptions = [
        {id:"BILLS", name:"Contas"},
        {id:"STOCK", name:"Estoque"},
        {id:"MAINTENANCE", name:"Manutenção"},
        {id:"OTHERS", name:"Outros"}

    ]

    const paymentTypeOptions = [
        {id:"CREDIT_CARD", name:"Cartão de crédito"},
        {id:"DEBIT_CARD", name:"Cartão de débito"},
        {id:"BILLET", name:"Boleto"},
        {id:"MONEY", name:"Dinheiro em Espécie"},
        {id:"PIX", name:"Pix"},
        {id:"TRANSFER", name:"Transferência"},

    ]

    useEffect(() => {
        axiosProvider.get("/products")
            .then((response) => {
                setProductOptions(
                    response.data.map((product) => (
                        {id: product.id, name:product.name}  
                    ))
                )
            })
            .catch(() => ([{id: null, name: "<Não encontrado>", disabled: true}]))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const responseCode = await registrarServico(formData, saveJob);

        if(responseCode == 201) {
            navigate(-1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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

    return (
        <main className="flex items-center justify-center h-[570px] my-6 w-full px-16">
          <section className="flex flex-col items-center justify-start gap-6 w-full px-4">
            <img src={logo} alt="logo-studio-zero-header" className="h-[250px]" />
            <h1 className="font-light text-4xl tracking-widest text-[#9A3379] text-center">
              Registre uma nova despesa
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
                 <Select
                    text="Categoria da despesa"
                    name="expenseCategory"
                    required
                    options={expenseCategoryOptions}
                    handleOnChange={handleInputChange}
                    value={formData.expenseCategory}
                />
                <Input
                    type="text"
                    text="Valor"
                    name="amountExpend"
                    required
                    placeholder="Digite o valor"
                    handleOnChange={handleValorChange}
                    value={formData.amountExpend}
                    maxLength="50"
                />
                {
                    formData.expenseCategory === "STOCK" ? (
                        <div className="flex gap-3 items-center justify-center w-full">
                            <Select
                                text="Item da despesa"
                                name="expenseDetail"
                                required
                                options={productOptions}
                                handleOnChange={handleInputChange}
                                value={formData.expenseDetail}
                            />  
                            <Input
                                type="text"
                                text="Quantidade do produto"
                                name="quantity"
                                required
                                placeholder="Digite a quantidade"
                                handleOnChange={handleValorChange}
                                value={formData.quantity}
                                maxLength="50"
                            />
                        </div>
                    ) : (
                        <Input
                            type="text"
                            text="Item da despesa"
                            name="expenseDetail"
                            required
                            placeholder="Digite o item da despesa"
                            handleOnChange={handleInputChange}
                            value={formData.expenseDetail}
                            maxLength="50"
                        />
                    )
                }
                <Input
                    type="text"
                    text="Valor"
                    name="amountExpend"
                    required
                    placeholder="Digite o valor"
                    handleOnChange={handleValorChange}
                    value={formData.amountExpend}
                    maxLength="50"
                />
                <Input
                  type="date"
                  text="Data prevista para o pagamento"
                  name="date"
                  required
                  placeholder="Digite o valor"
                  handleOnChange={handleInputChange}
                  value={formData.date}
                  min="1900-01-01"
                  max="2099-12-31"
                  className="custom-calendar"
                />
                <Select
                    text="Forma de pagamento"
                    name="paymentType"
                    required
                    options={paymentTypeOptions}
                    handleOnChange={handleInputChange}
                    value={formData.paymentType}
                />  
                </section>
        
            <SubmitButton text="Confirmar" />
        </form>
            

      </main>
    )
}

export default ExpenseRegister;
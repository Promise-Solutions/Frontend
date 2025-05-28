import logo from "../../../assets/logo-branco-bg-sonoro.png";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import SubmitButton from "../../../components/form/SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { axiosProvider } from "../../../provider/apiProvider";
import { getExpenseCategoryTranslated, getPaymentTypeTranslated } from "../../../hooks/translateAttributes";
import { registrarDespesa } from "./ExpenseRegister";
import { showToast } from "../../../components/toastStyle/ToastStyle";
import { getNumericValue } from "../../../hooks/formatUtils";

const ExpenseRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            descriptionDefault: "",
            descriptionStock: "",
            amountSpend: "",
            date: "",
            expenseCategory: "",
            paymentType: "",
            quantity: "",
            fkProduct: null
    });

    const [productOptions, setProductOptions] = useState([{id: null, name: "<Não encontrado>", disabled: true}]);
        
    const expenseCategoryOptions = [
        {id:"BILLS", name: getExpenseCategoryTranslated("BILLS")},
        {id:"STOCK", name: getExpenseCategoryTranslated("STOCK")},
        {id:"MAINTENANCE", name: getExpenseCategoryTranslated("MAINTENANCE")},
        {id:"OTHERS", name: getExpenseCategoryTranslated("OTHERS")}
    ]

    const paymentTypeOptions = [
        {id:"CREDIT_CARD", name: getPaymentTypeTranslated("CREDIT_CARD")},
        {id:"DEBIT_CARD", name: getPaymentTypeTranslated("DEBIT_CARD")},
        {id:"BILLET", name: getPaymentTypeTranslated("BILLET")},
        {id:"MONEY", name: getPaymentTypeTranslated("MONEY")},
        {id:"PIX", name: getPaymentTypeTranslated("PIX")},
        {id:"TRANSFER", name: getPaymentTypeTranslated("TRANSFER")}
    ]

    useEffect(() => {
        axiosProvider.get("/products")
            .then((response) => {
                console.log(response.data[0].name)
                
                setProductOptions(
                    response.data.map((product) => (
                        {id:JSON.stringify({id: product.id, name: product.name}), name:product.name}  
                    ))
                )
            })
            .catch(() => ([{id: null, name: "<Não encontrado>", disabled: true}]))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let description = formData.descriptionDefault

        
        console.log(formData)
        
        const formDataToSave = {
            ...formData,
            description: formData.descriptionDefault,
            amountSpend: getNumericValue(formData.amountSpend)
        };

        if(formData.expenseCategory === "STOCK") {
            formDataToSave.description = formData.descriptionStock
        } else {
            formDataToSave.fkProduct = null
            formDataToSave.quantity = null
        }

        delete formDataToSave.descriptionDefault;
        delete formDataToSave.descriptionStock;

        if(
            !formDataToSave.date || formDataToSave.date == ""
            || !formDataToSave.expenseCategory || formDataToSave.expenseCategory == ""
            || !formDataToSave.description || formDataToSave.description == ""
            || !formDataToSave.paymentType || formDataToSave.paymentType == ""
            || !formDataToSave.amountSpend || formDataToSave.amountSpend === ""
            || (formDataToSave.expenseCategory === "STOCK" && formDataToSave.quantity === "")
        ) {
            showToast.error("Não são permitidos campos vazios!");
            return;
        }

        if(formDataToSave.expenseCategory === "STOCK" && formDataToSave.quantity == 0) {
            showToast.error("Não é permitido a quantidade ser 0!");
            return;
        }

        console.log(formDataToSave)

        const responseCode = await registrarDespesa(formDataToSave);

        if(responseCode == 201) {
            showToast.success("Despesa registrada com sucesso!")
            navigate(-1);
        }
    };

    const handleProductOptionsChange = (e) => {
        const { name, value } = e.target;
        let productObj = { id: null, name: "" };
        try {
            productObj = JSON.parse(value);
        } catch {}
        setFormData((prevData) => ({
            ...prevData,
            [name]: productObj.name,
            fkProduct: productObj.id
        }));
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
                {
                    formData.expenseCategory === "STOCK" ? (
                        <div className="flex gap-3 items-center justify-center w-full">
                            <Select
                                text="Item da despesa"
                                name="descriptionStock"
                                required
                                options={productOptions}
                                handleOnChange={handleProductOptionsChange}
                                value={formData.descriptionStock}
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
                            name="descriptionDefault"
                            required
                            placeholder="Digite o item da despesa"
                            handleOnChange={handleInputChange}
                            value={formData.descriptionDefault}
                            maxLength="50"
                        />
                    )
                }
                <Input
                    type="text"
                    text="Valor"
                    name="amountSpend"
                    required
                    placeholder="Digite o valor"
                    handleOnChange={handleValorChange}
                    value={formData.amountSpend}
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
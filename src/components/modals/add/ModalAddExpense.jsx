import CancelButton from "../../buttons/action/CancelButton";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import ModalGeneric from "../ModalGeneric";
import { useEffect, useState } from "react";
import { getExpenseCategoryTranslated, getPaymentTypeTranslated } from "../../../hooks/translateAttributes";
import { getBRCurrency, getNumericValue } from "../../../hooks/formatUtils";
import Select from "../../form/Select";
import Input from "../../form/Input";
import { axiosProvider } from "../../../provider/apiProvider";
import { ENDPOINTS } from "../../../constants/endpoints";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../constants/routers";

const ModalAddExpense = ({
    isOpen, onClose, onSave
}) => {
    if(!isOpen) return;
    
    const [formData, setFormData] = useState({
            description: "",
            amountSpend: "",
            date: "",
            expenseCategory: "",
            paymentType: "",
            quantity: "",
            fkProduct: null
    });
    const navigate = useNavigate();
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
        axiosProvider.get(ENDPOINTS.PRODUCTS)
            .then((response) => {
                setProductOptions(
                    response.data.map((product) => (
                        {id: product.id, name:product.name}  
                    ))
                )
            })
            .catch(() => ([{id: null, name: "<Não encontrado>", disabled: true}]))
    }, [])

    
    const handleInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if(name === "quantity") {
            value = value.replace(/[^0-9]/g, "")
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleValorChange = (e) => {
      let { name, value } = e.target;

      value = value.replace(/[^0-9,.]/g, "");

      let newValue = value.replace(".", ",")
      
      const partes = newValue.split(",");
      if (partes.length > 2) {
        newValue = partes[0] + "," + partes.slice(1).join("");
      }
      
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    };

    const inputs = [
        <Select
            text="Categoria da despesa"
            name="expenseCategory"
            required
            options={expenseCategoryOptions}
            handleOnChange={handleInputChange}
            value={formData.expenseCategory}
            subtitle={formData.expenseCategory === "STOCK" ? 
                (
                <div className="flex gap-1">
                    Caso o produto desejado não exista no estoque, adicione
                    <span className="underline cursor-pointer" onClick={() => navigate(ROUTERS.BAR_STOCK)}>aqui</span>
                </div> 
                ) : (
                    null
                )}
        />,
        formData.expenseCategory === "STOCK" ? (
            <div className="flex gap-3 items-center justify-center w-full">
                <Select
                    text="Produto da despesa"
                    name="fkProduct"
                    required
                    options={productOptions}
                    handleOnChange={handleInputChange}
                    value={formData.fkProduct}
                />  
                <Input
                    type="text"
                    text="Quantidade do produto"
                    name="quantity"
                    required
                    placeholder="Digite a quantidade"
                    handleOnChange={handleInputChange}
                    value={formData.quantity}
                    maxLength="50"
                />
            </div>
        ) : (
            <Input
                type="text"
                text="Item da despesa"
                name="description"
                required
                placeholder="Digite o item da despesa"
                handleOnChange={handleInputChange}
                value={formData.description}
                maxLength="50"
            />
        )
        ,
        <Input
            type="text"
            text="Valor Total"
            name="amountSpend"
            required
            placeholder="Digite o valor total"
            handleOnChange={handleValorChange}
            value={formData.amountSpend}
            maxLength="50"
            subtitle={formData.expenseCategory === "STOCK" && formData.amountSpend && formData.quantity ? 
                (
                 "Valor da unidade : " + getBRCurrency((formData.amountSpend  / formData.quantity))
                ) : (
                    null
                )}
        />,
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
        />,
        <Select
            text="Forma de pagamento"
            name="paymentType"
            required
            options={paymentTypeOptions}
            handleOnChange={handleInputChange}
            value={formData.paymentType}
        />  
    ]

    const buttons = [
        <CancelButton text="Cancelar" type="button" onClick={onClose} />,
        <ConfirmButton text="Confirmar" onClick={() => onSave(formData, productOptions)}  />
    ]

    return (
        <ModalGeneric title="Adicionar Despesa" inputs={inputs} buttons={buttons} widthModal="w-[600px]" borderVariant="add" />
    );
}

export default ModalAddExpense;


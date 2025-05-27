import ModalEditGeneric from "../ModalEditGeneric";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../../provider/apiProvider";
import { ENDPOINTS } from "../../../constants/endpoints";
import Select from "../../form/Select";
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import Input from "../../form/Input";
import { getExpenseCategoryTranslated, getPaymentTypeTranslated } from "../../../hooks/translateAttributes";

const ModalEditExpense = ({
    idExpense, onClose, onSave
}) => {
    const [productOptions, setProductOptions] = useState([{id: null, name: "<Não encontrado>", disabled: true}]);
    const [expenseData, setExpenseData] = useState({
        expenseDetail: "Compra de materiais de escritório",
        expenseCategory: "Suprimentos",
        amountExpend: 250.75,
        date: "2025-05-15",
        quantity: 10,
        paymentType: "Cartão de crédito"
    });
    
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
        {id:"TRANSFER", name: getPaymentTypeTranslated("TRANSFER")},
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleValorChange = (e) => {
      let { name, value } = e.target;

      value = value.replace(/[^0-9,]/g, "");

      let newValue = value

      const partes = newValue.split(",");
      if (partes.length > 2) {
        newValue = partes[0] + "," + partes.slice(1).join("");
      }
      
      setExpenseData((prevData) => ({ ...prevData, [name]: newValue }));
    };

    const inputs =[
        <Select
            text="Categoria da despesa"
            name="expenseCategory"
            required
            options={expenseCategoryOptions}
            handleOnChange={handleInputChange}
            value={expenseData.expenseCategory}
        />,
        expenseData.expenseCategory === "STOCK" ? (
            <div className="flex gap-3 items-end justify-center w-full">
                <Select
                    text="Item da despesa"
                    name="expenseDetail"
                    required
                    options={productOptions}
                    handleOnChange={handleInputChange}
                    value={expenseData.expenseDetail}
                />  
                <Input
                    type="text"
                    text="Quantidade do produto"
                    name="quantity"
                    required
                    placeholder="Digite a quantidade"
                    handleOnChange={handleValorChange}
                    value={expenseData.quantity}
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
                value={expenseData.expenseDetail}
                maxLength="50"
            />
        ),
        <Input
            type="text"
            text="Valor"
            name="amountExpend"
            required
            placeholder="Digite o valor"
            handleOnChange={handleValorChange}
            value={expenseData.amountExpend}
            maxLength="50"
        />,
        <Input
            type="date"
            text="Data prevista para o pagamento"
            name="date"
            required
            placeholder="Digite o valor"
            handleOnChange={handleInputChange}
            value={expenseData.date}
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
            value={expenseData.paymentType}
        />  
    ]

    const buttons = [
        <CancelButton text="Cancelar" type="button" onClick={onClose} />,
        <ConfirmButton text="Salvar" onClick={() => onSave(expenseData, () => onClose())} />
    ]
    // useEffect(() => {
    //     axiosProvider.get(ENDPOINTS.EXPENSES)
    //     .then((response) => {
    //         setExpenseElements(response.data);
    //     })
    //     .catch((error) =>{  
    //         console.log("Erro ao buscar dados", error)
    //     })    
    // axiosProvider.get("/products")
    //     .then((response) => {
    //         setProductOptions(
    //             response.data.map((product) => (
    //                 {id: product.id, name:product.name}  
    //             ))
    //         )
    //     })
    //     .catch(() => ([{id: null, name: "<Não encontrado>", disabled: true}]))
    // },[])


    return (
        <ModalEditGeneric title={"Editar despesa"} inputs={inputs} buttons={buttons} initialData={expenseData} widthModal={"[600px]"} />
    );
}

export default ModalEditExpense;
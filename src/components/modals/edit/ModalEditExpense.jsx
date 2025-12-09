import ModalGeneric from "../ModalGeneric";
import { useEffect, useState } from "react";
import { axiosProvider } from "../../../provider/apiProvider";
import { ENDPOINTS } from "../../../constants/endpoints";
import Select from "../../form/Select";
import CancelButton from "../../buttons/action/CancelButton";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import Input from "../../form/Input";
import {
  getExpenseCategoryTranslated,
  getPaymentTypeTranslated,
} from "../../../hooks/translateAttributes";
import { getBRCurrency, getNumericValue } from "../../../hooks/formatUtils";

const ModalEditExpense = ({
  isOpen,
  initialData,
  onClose,
  onSave,
  onExpenseSaved,
}) => {
  const [productOptions, setProductOptions] = useState([
    { id: null, name: "<Não encontrado>", disabled: true },
  ]);
  const [expenseData, setExpenseData] = useState({
    description: "",
    amountSpend: "",
    date: "",
    expenseCategory: "",
    paymentType: "",
    quantity: "",
    fkProduct: null,
  });

  const expenseCategoryOptions = [
    { id: "BILLS", name: getExpenseCategoryTranslated("BILLS") },
    { id: "STOCK", name: getExpenseCategoryTranslated("STOCK") },
    { id: "MAINTENANCE", name: getExpenseCategoryTranslated("MAINTENANCE") },
    { id: "OTHERS", name: getExpenseCategoryTranslated("OTHERS") },
  ];

  const paymentTypeOptions = [
    { id: "CREDIT_CARD", name: getPaymentTypeTranslated("CREDIT_CARD") },
    { id: "DEBIT_CARD", name: getPaymentTypeTranslated("DEBIT_CARD") },
    { id: "BILLET", name: getPaymentTypeTranslated("BILLET") },
    { id: "MONEY", name: getPaymentTypeTranslated("MONEY") },
    { id: "PIX", name: getPaymentTypeTranslated("PIX") },
    { id: "TRANSFER", name: getPaymentTypeTranslated("TRANSFER") },
  ];

  useEffect(() => {
    setExpenseData(initialData);

    axiosProvider
      .get(ENDPOINTS.PRODUCTS)
      .then((response) => {
        setProductOptions(
          response.data.map((product) => ({
            id: product.id,
            name: product.name,
          }))
        );
      })
      .catch(() => [{ id: null, name: "<Não encontrado>", disabled: true }]);
  }, [initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "quantity") {
      value = value.replace(/[^0-9]/g, "");
    }

    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValorChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9.,]/g, "");

    let newValue = value.replace(".", ",");

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }

    setExpenseData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSaveChanges = async () => {
    const expenseDataUpdate = {
      ...expenseData,
      fkProduct: getNumericValue(expenseData.fkProduct),
      quantity: getNumericValue(expenseData.quantity),
      amountSpend: getNumericValue(expenseData.amountSpend),
    };

    if (expenseData.expenseCategory === "STOCK") {
      expenseDataUpdate.description =
        productOptions.find((p) => p.id === expenseDataUpdate.fkProduct)
          ?.name || expenseData.description;
    } else {
      expenseDataUpdate.fkProduct = null;
      expenseDataUpdate.quantity = null;
    }
    const idExpense = expenseDataUpdate.id;
    delete expenseDataUpdate.id;

    const response = await onSave(expenseDataUpdate, idExpense);

    if (response != null) {
      onExpenseSaved(response, expenseDataUpdate.quantity);
      onClose();
    }
  };

  const inputs = [
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
          text="Produto da despesa"
          name="fkProduct"
          required
          options={productOptions}
          handleOnChange={handleInputChange}
          value={expenseData.fkProduct}
        />
        <Input
          type="text"
          text="Quantidade do produto"
          name="quantity"
          required
          placeholder="Digite a quantidade"
          handleOnChange={handleInputChange}
          value={expenseData.quantity}
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
        value={expenseData.description}
        maxLength="50"
      />
    ),
    <Input
      type="text"
      text="Valor Total"
      name="amountSpend"
      required
      placeholder="Digite o valor total"
      handleOnChange={handleValorChange}
      value={String(expenseData.amountSpend).replace(".", ",")}
      maxLength="50"
      subtitle={
        expenseData.expenseCategory === "STOCK" &&
        expenseData.amountSpend &&
        expenseData.quantity &&
        expenseData.quantity > 0
          ? "Valor da unidade : " +
            getBRCurrency(
              getNumericValue(expenseData.amountSpend) /
                getNumericValue(expenseData.quantity)
            )
          : null
      }
    />,
    <Input
      type="date"
      text="Data de pagamento"
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
    />,
  ];

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton text="Salvar" onClick={handleSaveChanges} />,
  ];

  return (
    <ModalGeneric
      title="Editar despesa"
      inputs={inputs}
      buttons={buttons}
      widthModal="w-[625px]"
      borderVariant="edit"
    />
  );
};

export default ModalEditExpense;

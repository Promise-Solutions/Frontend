import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import ConfirmButton from "../../buttons/action/ConfirmButton";
import { showToast } from "../../toastStyle/ToastStyle";
import { axiosProvider } from "../../../provider/apiProvider";
import Input from "../../form/Input";
import CancelButton from "../../buttons/action/CancelButton";
import ModalGeneric from "../ModalGeneric";

const ModalEditGoal = ({ isOpen, onClose, onSave,  currentGoal=0 }) => {
  if (!isOpen) return null;

  const [inputGoal, setInputGoal] = useState(currentGoal);

  const handleInputChange = (e) => {
    let { value } = e.target;

    value = value.replace(/[^0-9,]/g, "");

    let newValue = value

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }
    setInputGoal(newValue);
  } 

  const handleConfirmUpdate = () => {
    if(inputGoal == null || inputGoal == "") {
      showToast.error("O campo de meta está vazio!")
      return;
    }
  
    onSave(inputGoal)
  }

  const input = [
    <Input
      type="text"
      name="commandNumber"
      required
      text="Atualize a meta"
      placeholder="Digite a nova meta"
      handleOnChange={handleInputChange}
      value={inputGoal}
    />
  ]

  const buttons = [
    <CancelButton text="Cancelar" type="button" onClick={onClose} />,
    <ConfirmButton text="Salvar meta" onClick={handleConfirmUpdate} />
  ]
  return (
    <ModalGeneric title="Meta" subTitle={`Meta atual: ${currentGoal}`} inputs={input} buttons={buttons} borderVariant="edit" />
  )
};

export default ModalEditGoal;

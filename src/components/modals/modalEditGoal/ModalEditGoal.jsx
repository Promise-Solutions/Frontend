import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import CancelButton from "../modalConfirmDelete/cancelButton";
import { showToast } from "../../toastStyle/ToastStyle";
import { axiosProvider } from "../../../provider/apiProvider";
import Input from "../../form/Input";

const ModalEditGoal = ({ isOpen, onClose, currentGoal=0 }) => {
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

  const handleSaveGoal = () => {
    if(inputGoal == null || inputGoal == "") {
      showToast.error("O campo de meta está vazio!")
      return;
    }
    
    alert("Salvando meta");


    // axiosProvider.patch(`/expenses?goal=${inputGoal}`)
    //   .then(() => {
    //     showToast.success("Meta atualizada!")
    //     onClose();

    //   })
    // .catch((error) => {
    //   showToast.error("Erro ao atualizar meta!")
    //   console.log("Erro ao atualizar meta!", error)
    // })
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-10">
      <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Meta<br></br>
          <span className="text-yellow-zero text-[14px]">
            Meta atual: {currentGoal} 
          </span>
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="commandNumber"
            required
            text="Atualize a meta"
            placeholder="Digite a nova meta"
            handleOnChange={handleInputChange}
            value={inputGoal}
          />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <CancelButton text="Cancelar" type="button" onClick={onClose} />
          <ConfirmButton text="Salvar meta" onClick={handleSaveGoal} />
        </div>
      </div>
    </div>
  );
};

export default ModalEditGoal;

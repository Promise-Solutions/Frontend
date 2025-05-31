import { useEffect, useState } from "react";
import { useSubJobContext } from "../../../../context/SubJobContext";
import { handleInputChange, changeSubJobData } from "./ModalEditSubJob.script";
import ModalConfirmDelete from "../../ModalConfirmDelete";
import Input from '../../../form/Input'
import CancelButton from "../../../buttons/action/CancelButton";
import ConfirmButton from "../../../buttons/action/ConfirmButton";
import DeleteButton from "../../../buttons/action/DeleteButton";
import { useParams } from "react-router-dom";
import Select from "../../../form/Select";
import Checkbox from "../../../form/Checkbox";
import ModalGeneric from "../../ModalGeneric";
import { getNumericValue } from "../../../../hooks/formatUtils";

const ModalEditSubJob = ({ subJobData, onCancel, onSave, onDelete  }) => {
  const { updateSubJobData, deleteSubJobById } = useSubJobContext();
  const [subJobsInfos, setSubJobsInfos] = useState(subJobData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { jobId } = useParams(); 

  const handleInputCheckboxChange = (e) => {
    const { name } = e.target;
    setSubJobsInfos((prevData) => ({ ...prevData, [name]: e.target.checked }));
  };

  const handleValorChange = (e, setSubJobsInfos) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9,]/g, "");

    let newValue = value

    const partes = newValue.split(",");
    if (partes.length > 2) {
      newValue = partes[0] + "," + partes.slice(1).join("");
    }
    
    setSubJobsInfos((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const infosUpdate = {
      ...subJobsInfos,
      value: getNumericValue(subJobsInfos.value),
      fkService: jobId
    }

    const response = await changeSubJobData(infosUpdate, updateSubJobData)
    if (response) {
      const {jobTotalValue, ...dataUpdated} = response 
      onSave(dataUpdated, jobTotalValue);   
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteSubJobById(id)

    if (response.id != null) {
      onDelete(response);
    }
    setIsDeleteModalOpen(false)
  }

  const inputs = [
    <Input
      type="text"
      name="title"
      text="Titulo"
      placeholder="Digite o titulo do subserviço"
      value={subJobsInfos?.title || ""}
      handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
      disabled
    />,
    <Input
      type="text"
      name="description"
      text="Descrição"
      maxLength={200}
      placeholder="Digite a descrição"
      value={subJobsInfos?.description || ""}
      handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
      min="0"
    />,
    <Input
      type="text"
      name="value"
      text="Valor do produto"
      placeholder="Digite o valor do serviço"
      value={String(subJobsInfos?.value).replace(".", ",") || ""}
      handleOnChange={(e) => handleValorChange(e, setSubJobsInfos)}
    />,
    <Checkbox
      text="Utilizará a Sala?"
      name="needsRoom"
      handleOnChange={handleInputCheckboxChange}
      value={subJobsInfos?.needsRoom || ""}
    />,
    <Input
        type="date"
        text="Data prevista para subserviço"
        name="date"
        placeholder="Digite o valor"
        handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
        value={subJobsInfos?.date ? subJobsInfos.date : ""  || ""}
        min={new Date().toLocaleDateString("en-CA")}
        max="2099-12-31"
        className="custom-calendar"
      />,
    <div className="flex items-end justify-between w-full gap-8">
      <Input
        type="time"
        text="Horário de início"
        name="startTime"
        placeholder="Digite o valor"
        handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
        value={subJobsInfos?.startTime ? subJobsInfos.startTime : "" || ""}
        className="custom-calendar"
        />

      <Input
        type="time"
        text="Previsão de conclusão"
        name="expectedEndTime"
        placeholder="Digite o valor"
        handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
        value={subJobsInfos?.expectedEndTime ? subJobsInfos.expectedEndTime : "" || ""}
        className="custom-calendar"
        />,
    </div>
  ]

  const buttons = [
    <DeleteButton 
      id="btn_delete_subjob" 
      text="Excluir"
      onClick={() => setIsDeleteModalOpen(true)}
    />,
    <div className="flex justify-end gap-4 w-[60%]">
      <CancelButton text="Cancelar" type="button" onClick={onCancel} />
      <ConfirmButton onClick={handleSubmit} text="Salvar" />
    </div>
  ]
  return (
    <>
      <ModalGeneric title="Editar Subserviço" inputs={inputs} buttons={buttons} borderVariant="edit"/>
      <ModalConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(subJobData.id)}
        title={"Deletar Subserviço"}
        description={"Tem certeza de que deseja deletar este subserviço?"}
      />
    </>
  )
}

export default ModalEditSubJob; 
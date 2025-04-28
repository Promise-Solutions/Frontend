import { useEffect, useState } from "react";
import { useSubJobContext } from "../../../context/SubJobContext";
import { handleInputChange, changeSubJobData, getNumericValue } from "./ModalEditSubJob.script";
import ModalConfirmDelete from "../modalConfirmDelete/ModalConfirmDelete";
import Input from '../../form/Input'
import CancelButton from "../modalConfirmDelete/cancelButton";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import DeleteButton from "../../buttons/deleteButton/DeleteButton";
import { useParams } from "react-router-dom";

const ModalEditSubJob = ({ subJobData, onCancel, onSave, onDelete  }) => {
  const { updateSubJobData, deleteSubJobById } = useSubJobContext();
  const [subJobsInfos, setSubJobsInfos] = useState(subJobData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { jobId } = useParams(); 

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

    console.log(subJobsInfos)

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

  return (
    <div className="fixed backdrop-blur inset-0 bg-black/90 flex justify-center items-center z-50">
    <div className="bg-[#1E1E1E98] border-1 border-pink-zero text-white p-6 shadow-lg min-w-[600px]">
      <h2 className="text-xl font-bold mb-4">Editar Serviço</h2>
      {subJobsInfos && (

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="title"
            text="Titulo"
            placeholder="Digite o titulo do subserviço"
            value={subJobsInfos?.title || ""}
            handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
            disabled
          />
          <Input
            type="text"
            name="description"
            text="Descrição"
            maxLength={320}
            placeholder="Digite a descrição"
            value={subJobsInfos?.description || ""}
            handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
            min="0"
          />
          <Input
            type="text"
            name="value"
            text="Valor do produto"
            placeholder="Digite o valor do serviço"
            value={String(subJobsInfos?.value).replace(".", ",") || ""}
            handleOnChange={(e) => handleValorChange(e, setSubJobsInfos)}
          />
          <Input
            type="date"
            text="Data prevista para serviço"
            name="date"
            placeholder="Escolha a data"
            handleOnChange={(e) => handleInputChange(e, setSubJobsInfos)}
            value={subJobsInfos?.date || ""}
            min={new Date().toLocaleDateString("en-CA")}
            max="2099-12-31"
            className="custom-calendar"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <DeleteButton 
            id="btn_delete_subjob" 
            text="Excluir"
            onClick={() => setIsDeleteModalOpen(true)}
          />
          <div className="flex justify-end gap-4 w-[60%]">
            <CancelButton text="Cancelar" type="button" onClick={onCancel} />
            <ConfirmButton type="submit" text="Salvar" />
          </div>
        </div>
      </form>
      )}
    </div>
    <ModalConfirmDelete
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDelete(subJobData.id)}
          title={"Deletar Subserviço"}
          description={"Tem certeza de que deseja deletar este subserviço?"}
        />
  </div>
  );
}

export default ModalEditSubJob; 
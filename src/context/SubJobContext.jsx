import React, { createContext, useState, useContext } from "react";
import { axiosProvider } from "../provider/apiProvider";
import { showToast, ToastStyle } from "../components/toastStyle/ToastStyle";
import { ENDPOINTS } from "../constants/endpoints";

const SubJobContext = createContext({});

export function SubJobProvider({ children }) {
  const saveSubJob = async (formData) => {
    try {
      const request = await axiosProvider.post(ENDPOINTS.SUBJOBS, formData);
      if (request.status == 201) {
        showToast.success("Subservico Cadastrado!");
        return request.status
      }
      return null;
    } catch (error) {
      if(error && error.response.status == 409) {
        showToast.error("Horários em conflito com outro subserviço registrado.")
      } else {
        showToast.error("Não foi possível cadastrar o subserviço");
      }
    };
  };
  
  const updateSubJobStatus = async (id, newStatus) => {
    if (!id) return;
    
    try {
      const response = await axiosProvider.patch(`${ENDPOINTS.getSubJobById(id)}/update-status`, { status: newStatus})
  
      if (response.status == 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      showToast.error("Não foi possível atualizar o status do subserviço")
      console.log("Não foi possível atualizar o status do subserviço", error)
      return null;
    }
  }
  
  const findSubJobsByJobId = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axiosProvider.get(ENDPOINTS.getSubJobByJob(jobId))
      const subJobData = response.data
      return subJobData;
    } catch (error) {
      console.error("Erro ao buscar subserviços:", error)
      return [];
    };
  }

  const updateSubJobData = async (subJobData) => {
    if (subJobData == null) return;
    const id = subJobData.id;

    try {
      console.log("subJobDAta",  subJobData)
      const request = await axiosProvider.patch(ENDPOINTS.getSubJobById(id), {
        title: subJobData.title,
        description: subJobData.description,
        value: subJobData.value,
        date: subJobData.date,
        needsRoom: subJobData.needsRoom,
        startTime: subJobData.startTime,
        expectedEndTime: subJobData.expectedEndTime,
        status: subJobData.status,
        fkService: subJobData.fkService
      });

      if (request.status === 200) {
        console.log("Subserviço atualizado com sucesso!");
        showToast.success("Subserviço atualizado com sucesso!");
        return request.data
      }
    } catch (error) {
      if(error && error.response.status == 409) {
        showToast.error("Horários em conflito com outro subserviço registrado.")
      } else {
        showToast.error("Erro ao atualizar o subserviço");
        console.error("Erro ao atualizar o subserviço", error);
      }
    }
  };

  const deleteSubJobById = async (subJobId) => {
    if (!subJobId) return;

    try {
      const request = await axiosProvider.delete(ENDPOINTS.getSubJobById(subJobId));
      if(request.status == 200) {
        showToast.success("Subserviço excluído com sucesso!")
        return request.data
      } else {
        showToast.error("Não foi possível excluir o subserviço")
        return null
      }
    } catch (error) {
      showToast.error("Erro ao excluir subserviço");
      console.log("Erro ao excluir subserviço", error);
    }
  };

  return (
    <SubJobContext.Provider
      value={{
        findSubJobsByJobId,
        updateSubJobStatus,
        updateSubJobData,
        deleteSubJobById,
        saveSubJob,
      }}
    >
      {children}
    </SubJobContext.Provider>
  );
}

export const useSubJobContext = () => useContext(SubJobContext);

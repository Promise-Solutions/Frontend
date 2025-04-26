import React, { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { axiosProvider } from "../provider/apiProvider";
import { showToast, ToastStyle } from "../components/toastStyle/ToastStyle";

const SubJobContext = createContext({});

export function SubJobProvider({ children }) {
  const saveSubJob = async (formData) => {
    try {
      const request = await axiosProvider.post(`/sub-jobs`, formData);
      if (request.status == 201) {
        toast.success("Subservico Cadastrado!");
        return request.status
      }
      return null;
    } catch (error) {
      toast.error("Erro ao cadastrar subserviço!");
    };
  };
  
  const updateSubJobStatus = async (id, newStatus, currentDateTime) => {
    if (!id) return;
    
    try {
      const request = await axiosProvider.patch(`/sub-jobs/${id}/update-status`, { status: newStatus, endTime: currentDateTime })
  
      if (request.status == 204) {
        return request.status;
      }
      return null;
    } catch (error) {
      toast.error("Erro ao excluir subserviço")
      console.log("Erro ao excluir subserviço", error)
      return null;
    }
  }
  
  const findSubJobsByJobId = async (jobId) => {
    if (!jobId) return;

    try {
      const response = await axiosProvider.get(`/sub-jobs/job?fkService=${jobId}`)
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
      const request = await axiosProvider.patch(`/sub-jobs/${id}`, {
        title: subJobData.title,
        description: subJobData.description,
        value: subJobData.value,
        date: subJobData.date,
        startTime: subJobData.startTime,
        endTime: subJobData.endTime,
        status: subJobData.status,
        fkService: subJobData.fkService
      });

      if (request.status === 200) {
        console.log("Subserviço atualizado com sucesso!");
        toast.success("Subserviço atualizado com sucesso!");
        return request
      }
    } catch (error) {
      toast.error("Erro ao atualizar o subserviço");
      console.error("Erro ao atualizar o subserviço", error);
    }
  };

  const deleteSubJobById = async (subJobId) => {
    if (!subJobId) return;

    try {
      const request = await axiosProvider.delete(`/sub-jobs/${subJobId}`);
      if(request.status == 200) {
        showToast.success("Subserviço excluído com sucesso!")
        return subJobId
      } else {
        showToast.error("Não foi possível excluir o subserviço")
        return null
      }
    } catch (error) {
      toast.error("Erro ao excluir subserviço");
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

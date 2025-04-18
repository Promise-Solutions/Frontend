import React, { createContext, useState, useContext } from "react"
import toast from "react-hot-toast";
import { axiosProvider } from "../provider/apiProvider";
import { showToast, ToastStyle } from "../components/toastStyle/ToastStyle";

const SubJobContext = createContext({});

export function SubJobProvider({ children }) {
    const [currentDate, setCurrentDate] = useState();

    const saveSubJob = async (formData) => {
        try {
           const request = await axiosProvider.post(`/subservicos`, formData)
    
           if (request.status == 201) {
            toast.success("Subservico Cadastrado!")
          } 
        } catch(error) {
            toast.error("Erro ao cadastrar subservico!")
            console.error("Erro ao cadastrar subservico!", error)
        }
      }

    const findSubJobsByJobId = async (jobId) => {
        if(!jobId) return;

        try {
            const response = await axiosProvider.get(`/subservicos?fkServico=${jobId}`)
            const subJobData = response.data 
            return subJobData;
        } catch(error) {
            console.error("Erro ao buscar subserviços:", error)
        };
    }

    const updateStatus = async (id, isDone) => {
        if(!id) return;

        try {
            const dataFormatada = getCurrentDate(isDone);
            setCurrentDate(dataFormatada)

            const request = await axiosProvider.patch(`/subservicos/${id}`, { concluido: isDone, horarioConclusao : dataFormatada });
            if (request.status === 200) {
                console.log("Status atualizado com sucesso")
              }
        } catch(error) {
            toast.error("Erro ao atualizar o status do subserviço:");
            console.error("Erro ao atualizar o status do subserviço:", error);
        }
      }

      const getCurrentDate = (isDone) => {
        const dataAtual = isDone ? new Date() : null

        let dataFormatada = null
        if(dataAtual != null) {
            dataFormatada = formatCurrenteDate(dataAtual)
        }
        return dataFormatada
      }

      const formatCurrenteDate = (dataAtual) => {
        const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
            const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const anoAtual = dataAtual.getFullYear();
            const horaAtual = String(dataAtual.getHours()).padStart(2, '0');
            const minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0');
            
            return `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`
      }

    const updateSubJobData = async (subJobData) => {
        if(subJobData == null) return;
        const id = subJobData.id;

        try {
            const request = await axiosProvider.patch(`/subservicos/${id}`, { titulo: subJobData.title, descricao: subJobData.description, quantidade: subJobData.quantity, valor: subJobData.value, dataPrevista:subJobData.expectedDate})
        
            if(request.status === 200) {
                console.log("Subserviço atualizado com sucesso!")
                showToast.success("Subserviço atualizado com sucesso!")
            }
        } catch(error) {
            toast.error("Erro ao atualizar o subserviço")
            console.error("Erro ao atualizar o subserviço", error)
        }
    }

    const deleteSubJobById = async (subJobId) => {
        if(!subJobId) return;

        try {
            const request = await axiosProvider.delete(`/subservicos/${subJobId}`)


            if(request.status == 200) {
                return true;
            }
            return false;

        } catch (error) {
            toast.error("Erro ao excluir subserviço")
            console.log("Erro ao excluir subserviço", error)
        }
    }

    return (
        <SubJobContext.Provider 
            value={{
                currentDate,
                setCurrentDate,
                findSubJobsByJobId,
                updateStatus,
                updateSubJobData,
                deleteSubJobById,
                saveSubJob
            }}
        
        >
            {children}
        </SubJobContext.Provider>
    );
}

export const useSubJobContext = () => useContext(SubJobContext);
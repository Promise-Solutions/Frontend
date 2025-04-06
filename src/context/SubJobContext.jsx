import React, { createContext, useState, useContext } from "react"
import axios from "axios"
import toast from "react-hot-toast";

const SubJobContext = createContext({});

export function SubJobProvider({ children }) {
    const [currentDate, setCurrentDate] = useState();

    const findSubJobsByJobId = async (jobId) => {
        if(!jobId) return;

        try {
            const response = await axios.get(`http://localhost:5000/subservicos?idServico=${jobId}`)
            const subJobData = response.data 
            console.log("subserviços", subJobData)
            return subJobData;
        } catch(error) {
            console.error("Erro ao buscar subserviços:", error)
        };
    }

    const updateStatus = async (id, isDone) => {
        if(!id) return;

        try {
            const dataAtual = isDone ? new Date() : null
            console.log("data atual: " + dataAtual)

            let dataFormatada = null
            if(dataAtual != null) {
                const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
                const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
                const anoAtual = dataAtual.getFullYear();
                const horaAtual = String(dataAtual.getHours()).padStart(2, '0');
                const minutoAtual = String(dataAtual.getMinutes()).padStart(2, '0');
                dataFormatada = `${diaAtual}/${mesAtual}/${anoAtual} - ${horaAtual}:${minutoAtual}`

                console.log(dataFormatada)
            }

            setCurrentDate(dataFormatada)
            const request = await axios.patch(`http://localhost:5000/subservicos/${id}`, { concluido: isDone, horarioConclusao : dataFormatada });
            if (request.status === 200) {
                console.log("Status atualizado com sucesso")
              }
        } catch(error) {
            toast.error("Erro ao atualizar o status do subserviço:");
            console.error("Erro ao atualizar o status do subserviço:", error);
        } finally {
        }
      }

    const updateSubJobData = async (subJobData) => {
        if(subJobData == null) return;
        const id = subJobData.id;

        try {
            const request = await axios.patch(`http://localhost:5000/subservicos/${id}`, { titulo: subJobData.title, descricao: subJobData.description, quantidade: subJobData.quantity, valor: subJobData.value})
        
            if(request.status === 200) {
                console.log("Subserviço atualizado com sucesso!")
                toast.success("Subserviço atualizado com sucesso!")
            }
        } catch(error) {
            toast.error("Erro ao atualizar o subserviço")
            console.error("Erro ao atualizar o subserviço", error)
        }
    }

    const deleteSubJobById = async (subJobId) => {
        if(!subJobId) return;

        try {
            const request = await axios.delete(`http://localhost:5000/subservicos/${subJobId}`)

            console.log("Status da requisição: " + request.status)
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
                deleteSubJobById
            }}
        
        >
            {children}
        </SubJobContext.Provider>
    );
}

export const useSubJobContext = () => useContext(SubJobContext);
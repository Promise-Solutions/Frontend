import { useSubJobContext } from "../../context/SubJobContext";

export const handleInputChange = (e, setSubJobData) => {
    const { name, value } = e.target;
    setSubJobData(prev => ({ ...prev, [name]: value }));
}

export const changeSubJobInfo = (subJobInfo, updateSubJobData) => {
    const infos = {
        id: subJobInfo.id,
        title: subJobInfo.title,
        description: subJobInfo.description,
        quantity: Number(subJobInfo.quantity),
        value: Number(subJobInfo.value)
    }

    return updateSubJobData(infos);
}

export const deleteSubJob = (subJobId, deleteSubJobById) => {
    deleteSubJobById(subJobId)
}
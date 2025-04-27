import toast from "react-hot-toast";
import { ToastStyle } from "../../toastStyle/ToastStyle";

export const handleInputChange = (e, setSubJobsInfos) => {
    const { name, value } = e.target;
    setSubJobsInfos(prev => ({ ...prev, [name]: value }));
}

 
export const changeSubJobData = async (infos, updateSubJobData) => {
    if(!infos.title || !infos.description || infos.value == null  || !infos.date) {
        toast.error("Todos os campos devem estar preenchidos!", { style: ToastStyle })
        return;
    } 
    if(infos.value < 0) {
        toast.error("Não são aceitos valores negativos!", { style: ToastStyle })
        return;
    } 
    return await updateSubJobData(infos);
}

export const getNumericValue = (valueString) => {
  if(typeof valueString === "string" && valueString.includes(",")) {
    valueString = valueString.replace(",", ".");
  }
  return parseFloat(valueString);
};
import { showToast } from "../../../components/toastStyle/ToastStyle.jsx";

export const registrarSubServico = async (formData, saveSubJob) => {
  if (
    formData.title == "" ||
    formData.description == "" ||
    formData.value == ""
  ) {
    showToast.error("Preencha todos os campos!");
    return;
  }
  if (formData.value < 0) {
    showToast.error("Não são aceitos valores negativos!");
    return;
  }
  if (formData.description.length < 2 || formData.description.length > 500) {
    showToast.error("Descrição deve ter entre 2 e 500 caracteres");
    return;
  }
  if (
    formData.needsRoom &&
    (formData.date == null ||
      formData.startTime == null ||
      formData.expectedEndTime == null)
  ) {
    showToast.error(
      "Quando há o uso de sala, a data os horários precisam ser informados!"
    );
    return;
  }
  if (formData.startTime > formData.expectedEndTime) {
    showToast.error("O horário de início não pode vir após ao de conclusão");
    return;
  }

  formData = { ...formData, endTime: null, status: "PENDING" };
  const responseCode = await saveSubJob(formData);
  return responseCode;
};

import { RenderInfos } from "./User.script";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs.jsx";
import { MdCake } from "react-icons/md";

const User = () => {
  // Função utilitária para verificar se é aniversário do mês
  const isBirthdayMonth = () => {
    // Tenta obter o birthDay do usuário do localStorage/context (ajuste conforme sua lógica)
    const userData = JSON.parse(localStorage.getItem("selectedUser")) || {};
    if (!userData.birthDay) return false;
    const birthMonth = new Date(userData.birthDay).getMonth();
    const nowMonth = new Date().getMonth();
    return birthMonth === nowMonth;
  };

  return (
    <div className="slide-in-ltr text-white flex mx-16 flex-col">
      <Breadcrumbs />
      <RenderInfos />
    </div>
  );
};

export default User;

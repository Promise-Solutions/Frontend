import { RenderInfos } from "./User.script.jsx";
import { useUserContext } from "../../context/UserContext.jsx";

const User = () => {
  //Ele n é necessário nessa tela, coloquei apenas para ver o log
  const { user } = useUserContext(); //Exportação do contexto

  console.log("User na renderização do cardUser...... ", user);

  return (
    <div className="text-white flex mx-16">
      <RenderInfos />
    </div>
  );
};

export default User;

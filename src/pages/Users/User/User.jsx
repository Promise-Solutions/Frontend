import ReturnButton from "../../../components/buttons/returnButton/ReturnButton";
import { RenderInfos } from "./User.script";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs.jsx";

const User = () => {
  return (
    <div className="slide-in-ltr text-white flex mx-16 flex-col">
      <Breadcrumbs />
      <RenderInfos />
    </div>
  );
};

export default User;

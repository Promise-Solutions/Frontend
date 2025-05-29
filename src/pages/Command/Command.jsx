import { useEffect } from "react";
import { RenderCommandDetails } from "./Command.script.jsx";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.jsx";

const Command = () => {
  return (
    <div className="slide-in-ltr text-white flex mx-16 flex-col">
      <Breadcrumbs />
      <RenderCommandDetails />
    </div>
  );
};

export default Command;

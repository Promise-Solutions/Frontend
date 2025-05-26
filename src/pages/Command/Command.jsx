import { useEffect } from "react";
import { RenderCommandDetails } from "./Command.script.jsx";

const Command = () => {
  return (
    <div className="slide-in-ltr text-white flex mx-16 flex-col">
      <RenderCommandDetails />
    </div>
  );
};

export default Command;

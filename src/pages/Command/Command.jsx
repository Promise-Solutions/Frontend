import { useEffect } from "react";
import { RenderCommandDetails } from "./Command.script.jsx";

const Command = () => {
  useEffect(() => {
    console.log("Command component mounted");
    alert("Command page loaded");

    return () => {
      console.log("Command component unmounted");
    };
  }, []); // Ensure this runs only once when the component is mounted

  return (
    <div className="text-white flex mx-16 flex-col">
      <RenderCommandDetails />
    </div>
  );
};

export default Command;

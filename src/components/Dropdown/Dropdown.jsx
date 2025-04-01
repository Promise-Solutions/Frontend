import { useState } from "react";
import ArrowUp from "../Arrows/ArrowUp";
import ArrowDown from "../Arrows/ArrowDown";

const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState(ArrowDown);
    console.log("URL da imagem:", url);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setUrl(isOpen ? ArrowUp : ArrowDown);
    };

  return (
    <div className="mt-12 h-full w-full my-12">
      <div className="flex w-full justify-between items-center cursor-pointer">
        <h1
          id="text"
          className={`pb-2 text-5xl w-full border-b-1 ${
            isOpen
              ? "border-cyan-zero text-cyan-zero"
              : "border-pink-zero text-pink-zero"
          }`}
          onClick={toggleDropdown}
        >
          {title}
        </h1>
        <div
          onClick={toggleDropdown}
          className={`w-10 border-b-1 mt-[17px] ${
            isOpen ? "border-cyan-zero" : "border-pink-zero"
          }`}
        >
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
      <div
        id="content-dropdown"
        className={`contentDropdown h-full w-full justify-center items-center mt-12 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="mx-16 p-4 bg-[#1E1E1E90] border-1 border-pink-zero ">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

import { useState } from "react";
import icon from "../../assets/icone-busca.png";

const userFilter = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex flex-row border-1 h-10 w-60 items-center transition-colors ease-in-out duration-100 ${
        isFocused ? "border-[#9A3379]" : "border-white"
      }`}
    >
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />
      <input
        id="input_search_user"
        type="text"
        placeholder={placeholder}
        className="outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default userFilter;

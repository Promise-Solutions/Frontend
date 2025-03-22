import { useState } from "react";
import icon from "../../assets/icone-busca.png";

const userFilter = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(""); // Estado para o valor do input

  const handleInputChange = (e) => {
    setValue(e.target.value); // Atualiza o estado com o valor do input
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setValue((prev) => prev.slice(0, -1)); // Remove o último caractere
    }
  };

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
        value={value} // Vincula o valor do input ao estado
        onChange={handleInputChange} // Atualiza o valor ao digitar
        onKeyDown={handleKeyDown} // Garante que backspace funcione
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default userFilter;

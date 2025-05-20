// UserFilter.jsx
import { useState } from "react";
import icon from "../../../assets/icone-busca.png";

const UserFilter = ({ id, placeholder, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue); // onSearch deve ser responsável por filtrar os cards no componente pai
  };

  return (
    <div
      className={`flex flex-row border-1 h-10 w-60 items-center transition-colors ease-in-out duration-100 ${
        isFocused ? "border-pink-zero" : "border-white"
      }`}
    >
      <img src={icon} alt="Buscar" className="mx-2 w-[24px] h-[24px]" />
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="outline-none"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default UserFilter;

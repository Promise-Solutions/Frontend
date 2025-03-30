const Select = ({ text, name, options, handleOnChange, value }) => {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <label htmlFor={name} className="text-[20px] text-white">
        <b>{text}:</b>
      </label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
        className="h-10 pl-2 bg-transparent border border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out focus:border-[#9A3379] appearance-none bg-no-repeat bg-right pr-8 hover:text-white focus:text-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      >
        <option
          value=""
          disabled
          className="bg-[#1E1E1E] border border-[#9A3379] text-white rounded-none hover:bg-[#9A3379]"
        >
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option
            value={option.id}
            key={option.id}
            className="bg-[#1E1E1E] border border-[#9A3379] text-white rounded-none hover:bg-[#9A3379]"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

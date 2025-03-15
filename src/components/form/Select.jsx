function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
      <label htmlFor={name} className="text-sm text-white">
        {text}:
      </label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
        className="h-8 bg-transparent border-b border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out"
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

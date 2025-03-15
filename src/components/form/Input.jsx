function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
      <label htmlFor={name} className="text-sm text-white">
        {text}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        className="h-8 bg-transparent border-b border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out"
      />
    </div>
  );
}

export default Input;

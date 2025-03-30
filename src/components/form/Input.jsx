function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <label htmlFor={name} className="text-[20px] text-white">
        <b>{text}:</b>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        className="h-8 bg-transparent border-b border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out focus:border-[#9A3379]"
      />
    </div>
  );
}

export default Input;

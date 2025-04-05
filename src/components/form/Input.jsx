function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  min,
  max,
}) {
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
        {...(min !== undefined && { min })} // Add min if provided
        {...(max !== undefined && { max })} // Add max if provided
        className="h-8 bg-transparent border-b border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out focus:border-pink-zero"
      />
    </div>
  );
}

export default Input;

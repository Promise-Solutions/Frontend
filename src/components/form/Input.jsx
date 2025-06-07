function Input({
  type,
  text,
  subtitle,
  name,
  placeholder,
  handleOnChange,
  value,
  min,
  max,
  step,
  required = false,
  maxLength,
  className = ""
}) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <div className="flex justify-between items-end">
        <label htmlFor={name} className="text-[20px] text-white">
          <b>{text} {required ? <span className="text-red-zero">*</span> : ""} :</b>
        </label>

        {subtitle && (
          <div className="text-[13px] text-yellow-zero mb-1">
            {subtitle}
          </div>
        )}
      </div>
      <input
        required={required}
        autoComplete="off"
        type={type}
        step={step || ""} // Default to "any" if not provided
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(maxLength !== undefined ? { maxLength } : {})}
        {...(min !== undefined && { min })} // Add min if provided
        {...(max !== undefined && { max })} // Add max if provided
        className={`h-8 bg-transparent border-b border-[#5f6176] text-white text-lg focus:outline-none transition-all duration-150 ease-in-out focus:border-pink-zero ${className}`}
      />
    </div>
  );
}

export default Input;

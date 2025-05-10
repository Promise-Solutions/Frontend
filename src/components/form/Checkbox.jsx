const Checkbox = ({
    name, value, handleOnChange, text, required
}) => {
  return (
    <div className="flex justify-start items-center gap-2 w-full my-2 sm:w-[48%] md:w-full">
      <label htmlFor={name} className="flex items-center gap-2 cursor-pointer">
        <span className="text-[20px] text-white"><b>{text} {required ? <span className="text-red-zero">*</span> : ""} :</b></span>
        
        {/* Input escondido, mas acessível */}
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onChange={handleOnChange}
          className="peer hidden"
        />

        {/* Visual do checkbox */}
        <div className="w-6 h-6 border-2 border-[#5f6176] rounded flex items-center justify-center  peer-checked:bg-pink-zero peer-checked:border-2 "> 
          {value ? 
          (<svg
            className="w-4 h-4 text-cyan-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 13l4 4L19 6" />
          </svg>) :
          ""
        }
        </div>
      </label>
    </div>
  )   
}

export default Checkbox
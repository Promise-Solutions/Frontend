function SubmitButton({ text }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <button
        id="btn_form"
        className="secondary-button w-auto h-14 bg-transparent border-1 border-[#02AEBA] text-[#02AEBA] font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-[#9A3379] hover:text-[#9A3379]"
      >
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;

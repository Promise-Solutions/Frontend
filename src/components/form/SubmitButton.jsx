function SubmitButton({ text }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <button
        id="btn_form"
        className="secondary-button w-auto h-14 bg-transparent border-1 border-cyan-zero text-cyan-zero font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-pink-zero hover:text-pink-zero"
      >
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;

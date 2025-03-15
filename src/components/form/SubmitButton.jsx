function SubmitButton({ text }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-[24%]">
      <button className="h-[55px] w-full max-w-[550px] border-2 border-[#33343f] rounded-full cursor-pointer text-xl tracking-widest bg-[#530d3e] text-white transition-all duration-300 ease-in-out">
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;

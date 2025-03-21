function SubmitButton({ text }) {
  return (
    <div className="flex flex-col justify-between w-full sm:w-[48%] md:w-full">
      <button
        id="btn_form"
        className="text-[cyan] font-medium border border-solid border-[cyan] cursor-pointer py-4 px-7 inline-block transition duration-500"
      >
        {text}
      </button>
    </div>
  );
}

export default SubmitButton;

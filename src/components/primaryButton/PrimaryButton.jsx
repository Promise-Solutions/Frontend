const PrimaryButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-[#9A3379] text-[#9A3379] font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-[#02AEBA] hover:text-[#02AEBA]"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

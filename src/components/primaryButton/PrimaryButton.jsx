const PrimaryButton = ({ text }) => {
  return (
    <button
      className="primary-button bg-transparent border-1 border-[#9A3379] text-[#9A3379] font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-[cyan] hover:text-[cyan]"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

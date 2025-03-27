const SecondaryButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="secondary-button w-auto h-14 bg-transparent border-1 border-[cyan] text-[cyan] font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-[#9A3379] hover:text-[#9A3379]"
    >
      {text}
    </button>
  );
};

export default SecondaryButton

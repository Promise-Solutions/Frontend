const PrimaryButton = ({ id, text, onClick, className = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`primary-button bg-transparent border border-pink-zero text-pink-zero text-center font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-cyan-zero hover:text-cyan-zero whitespace-nowrap ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

const PrimaryButton = ({ id, text, onClick, className = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`primary-button w-auto h-14 bg-transparent border-1 border-pink-zero text-pink-zero font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-cyan-zero hover:text-cyan-zero ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

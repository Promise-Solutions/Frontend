const SecondaryButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="secondary-button w-auto h-14 bg-transparent border-1 border-cyan-zero text-cyan-zero font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
                 hover:border-pink-zero hover:text-pink-zero"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;

const ConfirmButton = ({ id, text, onClick, type }) => {
  return (
    <button
      type={type || "button"}
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-green-zero text-green-zero hover:bg-[#00FF0D20] transition-all duration-100 font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
    >
      {text}
    </button>
  );
};

export default ConfirmButton;

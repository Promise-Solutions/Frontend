const ConfirmButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-[#00FF0D] text-[#00FF0D] hover:bg-[#00FF0D20] transition-all duration-100 font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
    >
      {text}
    </button>
  );
};

export default ConfirmButton;

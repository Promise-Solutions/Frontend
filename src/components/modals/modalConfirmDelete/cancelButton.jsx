const CancelButton = ({ id, text, onClick, type = "button" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-gray-400 text-gray-400 hover:bg-[#99A1AF20] transition-all duration-100 font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
      type={type}
    >
      {text}
    </button>
  );
};

export default CancelButton;

const DeleteButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-red-zero text-red-zero hover:bg-[#C73E4020] transition-all duration-100 font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
    >
      {text}
    </button>
  );
};

export default DeleteButton;

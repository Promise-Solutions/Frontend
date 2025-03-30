const DeleteButton = ({ id, text, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-[#C73E40] text-[#C73E40] font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
    >
      {text}
    </button>
  );
};

export default DeleteButton;

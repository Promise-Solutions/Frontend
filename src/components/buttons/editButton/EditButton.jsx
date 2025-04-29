const EditButton = ({ id, text, onClick, type, className = "" }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="primary-button w-auto h-14 bg-transparent border-1 border-yellow-zero text-yellow-zero hover:bg-[#DDBB0F20] transition-all duration-100 font-bold py-4 px-8 cursor-pointer relative overflow-hidden"
      type={type}
    >
      {text}
    </button>
  );
};

export default EditButton;

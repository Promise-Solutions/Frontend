const SubmitButton = ({ text, id, onClick }) => {
  return (
    <button
      id={id}
      type="submit"
      className="secondary-button w-auto h-14 bg-transparent border-1 border-cyan-zero text-cyan-zero font-bold py-4 px-8 cursor-pointer relative overflow-hidden transition-all duration-100 
               hover:border-pink-zero hover:text-pink-zero"
      onClick={onClick}         
    >
      {text}
    </button>
  );
};

export default SubmitButton;

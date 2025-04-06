const RegisterUserButton = ({id, text, onClick}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="flex w-[41px] h-[41px] bg-transparent justify-center text-2xl border-1 border-pink-zero text-pink-zero font-bold text-center align-middle cursor-pointer relative overflow-hidden transition-all duration-100 hover:border-cyan-zero hover:text-cyan-zero"
    >
      {text}
    </button>
  );
};

export default RegisterUserButton;

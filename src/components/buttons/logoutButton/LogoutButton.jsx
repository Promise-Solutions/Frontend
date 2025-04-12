const LogoutButton = ({ id, text, onClick}) => {
  return (
    <button
      id={id}
      className={`text-[#02AEBA] font-medium border border-solid border-[#02AEBA] cursor-pointer 
                py-4 px-7 inline-block hover:text-[#9A3379] hover:border-[#9A3379] transition duration-100`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default LogoutButton;
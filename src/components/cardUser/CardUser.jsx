const CardUser = ({ id, name, category, email, telefone, onClick }) => {
  return (
    <div
      id={`user_${id}`}
      className="card_user border-2 border-[#9A3379] w-[17rem] h-auto flex-wrap bg-[#1E1E1E] cursor-pointer hover:border-[cyan] transition duration-100 ease-in-out"
      onClick={onClick} // Trigger the onClick callback
    >
      <div className="px-4 py-6 text-2xl font-bold">
        <h1 className="card_user_name">{name}</h1>
      </div>
      <div>
        {/* Divisão */}
        <div className="border-1 border-white"></div>
        <ul className="px-8 py-6 text-[16px] list-disc">
          <li>
            <b>Categoria:</b> <span>{category}</span>
          </li>
          <li>
            <b>Email:</b> <span>{email}</span>
          </li>
          <li>
            <b>Telefone:</b> <span>{telefone}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardUser;

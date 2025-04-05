const CardUser = ({
  id,
  name,
  tipoCliente,
  ativo,
  email,
  telefone,
  onClick,
}) => {
  return (
    <div
      id={`user_${id}`}
      className={`card_user border-1 border-pink-zero text-[#d9d9d9] w-[17rem] h-auto rounded-[5px] bg-[#1E1E1E90] cursor-pointer hover:border-cyan-zero transition duration-100 ease-in-out `}
    >
      <div
        className="flex justify-between items-center px-4 py-6 text-2xl font-bold"
        onClick={onClick} // Trigger the onClick callback
      >
        <h1 className="card_user_name">{name}</h1>{" "}
        <div
          className={`w-2 h-2 rounded-[50%] ${
            ativo == true ? "bg-green-zero" : "bg-red-zero"
          }`}
        ></div>
      </div>
      <div>
        {/* Divisão */}
        <div
          className={`border-1 border-pink-zero hover:border-cyan-zero transition duration-100`}
        ></div>
        <ul
          className={`px-8 py-6 text-[16px] list-disc marker:text-cyan-zero ease-in-out`}
          onClick={onClick} // Trigger the onClick callback
        >
          {tipoCliente && ( // Only render if tipoCliente exists
            <li>
              <b>Tipo:</b> <span>{tipoCliente}</span>{" "}
            </li>
          )}
          <li className="list-disc marker:text-cyan-zero">
            <div className="flex items-center gap-1">
              <b>E-mail:</b>{" "}
              <span className="card_user_email inline-block max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap">
                {email}
              </span>
            </div>
          </li>
          <li>
            <b>Contato:</b> <span className="card_user_contact">{telefone}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardUser;

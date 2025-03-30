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
      onClick={onClick} // Trigger the onClick callback
    >
      <div className="px-4 py-6 text-2xl font-bold">
        <h1 className="card_user_name">{name}</h1>
      </div>
      <div>
        {/* Divisão */}
        <div className={`border-1 border-pink-zero hover:border-cyan-zero transition duration-100`}></div>
        <ul
          className={`px-8 py-6 text-[16px] list-disc marker:text-cyan-zero ease-in-out`}
        >
          {tipoCliente && ( // Only render if tipoCliente exists
            <li>
              <b>Tipo de Cliente:</b> <span>{tipoCliente}</span>
            </li>
          )}
          <li>
            <b>Email:</b> <span>{email}</span>
          </li>
          <li>
            <b>Telefone:</b> <span>{telefone}</span>
          </li>
          <li>
            <b>Status:</b> <span>{ativo == true ? "Ativo" : "Inativo"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardUser;

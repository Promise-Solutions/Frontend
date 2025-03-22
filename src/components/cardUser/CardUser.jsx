const CardUser = ({ name, category, email, telefone }) => {
  return (
    <div className="border-2 border-[#9A3379] w-3xs bg-[#1E1E1E] cursor-pointer hover:border-[cyan] transition duration-100 ease-in-out">
      <div className="pl-4 py-6 text-2xl font-bold">
        <h1>{name}</h1>
      </div>
      <div>
        {/* Divisão */}
        <div className="border-1 border-white"></div>
        <ul className="pl-8 py-6 text-[16px] list-disc">
          <li>
            <b>Categoria:</b> {category}
          </li>
          <li>
            <b>Email:</b> {email}
          </li>
          <li>
            <b>Telefone:</b> {telefone}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardUser;

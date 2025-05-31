import ImageDone from "../../assets/icone-concluido.png"; // Importa o ícone de "check"

const CardCommand = ({
  id,
  name,
  totalValue,
  dateHourOpen,
  dateHourClose,
  discount,
  employeeName,
  commandNumber,
  onClick,
}) => {
  const isClosed = !!dateHourClose; // Verifica se a comanda está fechada

  return (
    <div
      id={`command_${id}`}
      className={`card_command border-1 ${
        isClosed ? "border-cyan-zero" : "border-pink-zero"
      } text-[#d9d9d9] w-[17rem] h-auto rounded-[5px] ${
        isClosed ? "bg-[#1E1E1E90]" : "bg-[#1E1E1E90]"
      } cursor-pointer hover:${
        isClosed ? "border-pink-zero" : "border-cyan-zero"
      } transition duration-100 ease-in-out `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center px-4 py-6 text-2xl font-bold">
        <h1 className="card_command_number">{`Comanda: ${commandNumber}`}</h1>
        {isClosed && (
          <img
            src={ImageDone}
            alt="Concluído"
            className="h-6 w-6" // Define o tamanho do ícone
          />
        )}
      </div>
      <div>
        <div
          className={`border-1 ${
            isClosed ? "border-cyan-zero" : "border-pink-zero"
          } hover:${
            isClosed ? "border-pink-zero" : "border-cyan-zero"
          } transition duration-100`}
        ></div>
        <ul
          className={`px-8 py-6 text-[16px] list-disc marker:${
            isClosed ? "text-pink-zero" : "text-cyan-zero"
          } ease-in-out`}
        >
          <li>
            <b>Cliente:</b> <span>{name}</span>
          </li>
          <li>
            <b>Funcionário:</b> <span>{employeeName}</span>
          </li>
          <li>
            <b>Valor Total:</b> <span>{totalValue}</span>
          </li>
          <li>
            <b>Desconto:</b> <span>{discount}</span>
          </li>
          <li>
            <b>Data Abertura:</b>
            <br></br> <span>{dateHourOpen}</span>
          </li>
          {dateHourClose && (
            <li>
              <b>Data Fechamento:</b> <span>{dateHourClose}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CardCommand;

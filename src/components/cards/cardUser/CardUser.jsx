import { IoMdMusicalNote } from "react-icons/io";
import { FaWhatsapp, FaBirthdayCake } from "react-icons/fa"; // Adicionado ícone de bolo

const CardUser = ({
  id,
  name,
  clientType,
  active,
  email,
  contact,
  birthDay, // Recebe birthDay
  onClick,
}) => {
  // Função para abrir WhatsApp em nova aba
  const handleWhatsappClick = (e) => {
    e.stopPropagation();
    if (!contact) return;
    // Remove caracteres não numéricos do contato
    const phone = contact.replace(/\D/g, "");
    if (phone.length < 10) return; // Não tenta abrir se o número for inválido
    window.open(`https://wa.me/55${phone}`, "_blank");
  };

  // Corrigido: Verifica se hoje é aniversário (apenas dia e mês, ignora ano)
  const isBirthdayToday = (() => {
    if (!birthDay) return false;
    let birthMonth, birthDate;
    if (typeof birthDay === "string" && birthDay.length >= 10) {
      // Suporta formato "YYYY-MM-DD"
      const [year, month, day] = birthDay.split("-");
      birthMonth = parseInt(month, 10);
      birthDate = parseInt(day, 10);
    } else {
      const birth = new Date(birthDay);
      birthMonth = birth.getMonth() + 1;
      birthDate = birth.getDate();
    }
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    return todayMonth === birthMonth && todayDate === birthDate;
  })();

  return (
    <div
      id={`user_${id}`}
      className={`card_user border-1 border-pink-zero hover:border-cyan-zero  text-[#d9d9d9] w-[17rem] h-auto rounded-[5px] bg-[#1E1E1E90] cursor-pointer relative`}
      onClick={onClick}
    >
      <div
        className="flex justify-between items-center px-4 py-6 text-2xl font-bold"
        title="Acessar Usuário"
      >
        <div className="flex items-center gap-2">
          <h1 className="card_user_name">{name}</h1>
          {isBirthdayToday && (
            <FaBirthdayCake
              className="text-cyan-zero"
              size={22}
              title="Aniversário hoje!"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={
              clientType
                ? `w-2 h-2 rounded-[50%] ${
                    active ? "bg-green-zero" : "bg-red-zero"
                  }`
                : ""
            }
          >
            {clientType ? "" : <IoMdMusicalNote />}
          </div>
        </div>
      </div>
      <div>
        <div
          className={`border-1 ${
            clientType ? "border-pink-zero" : "border-cyan-zero"
          }`}
        ></div>
        <ul className="px-8 py-6 text-[16px] list-disc marker:text-cyan-zero ease-in-out">
          {clientType && (
            <li>
              <b>Tipo:</b>{" "}
              <span className="card_user_clientType">{clientType}</span>
            </li>
          )}
          <li>
            <div className="flex items-center gap-1">
              <b>E-mail:</b>
              <span className="card_user_email inline-block max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap">
                {email}
              </span>
            </div>
          </li>
          <li>
            <b>Contato:</b> <span className="card_user_contact">{contact}</span>
          </li>
        </ul>
      </div>
      {/* Ícone do WhatsApp no canto inferior direito */}
      {contact && (
        <FaWhatsapp
          className="text-green-500 hover:text-green-400 cursor-pointer absolute bottom-3 right-3 z-10"
          size={28}
          title="Enviar mensagem no WhatsApp"
          onClick={handleWhatsappClick}
        />
      )}
    </div>
  );
};

export default CardUser;

// CardUser.jsx
import React from "react";
import { IoMdMusicalNote } from "react-icons/io";

const CardUser = ({
  id,
  name,
  clientType,
  active,
  email,
  contact,
  onClick,
}) => {
  return (
    <div
      id={`user_${id}`}
      className={`card_user border-1 border-pink-zero hover:border-cyan-zero  text-[#d9d9d9] w-[17rem] h-auto rounded-[5px] bg-[#1E1E1E90] cursor-pointer`}
      onClick={onClick}
    >
      <div
        className="flex justify-between items-center px-4 py-6 text-2xl font-bold"
        title="Acessar Usuário"
      >
        <h1 className="card_user_name">{name}</h1>
        <div
          className={clientType ? `w-2 h-2 rounded-[50%] ${
            active ? "bg-green-zero" : "bg-red-zero"
          }` : ""   
          }
        >{clientType ? "" : <IoMdMusicalNote />}</div>
      </div>
      <div>
        <div className={`border-1 ${clientType ? "border-pink-zero" : "border-cyan-zero"}`}></div>
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
    </div>
  );
};

export default CardUser;

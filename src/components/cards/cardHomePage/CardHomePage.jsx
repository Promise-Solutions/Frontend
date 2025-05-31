import { useNavigate } from "react-router-dom";
import { handleButtonClick } from "./CardHome.script";
import PrimaryButton from "../../buttons/primaryButton/PrimaryButton";

function CardHomePage({ title, text, icon, idButton, iconClassName }) {
  const navigate = useNavigate();

  return (
    <article
      className="flex flex-col justify-between align-center
                  text-white py-4 px-5 min-w-30 w-70 h-67 bg-[#1E1E1E90]
                  border-1 border-[#9A3379] hover:border-[#02AEBA] duration-100"
    >
      <h1 className="text-[30px] tracking-widest text-[#9A3379] font-semibold w-[80%] h-[25%] flex items-center">
        {title}
      </h1>
      <div className="flex justify-between items-center mb-2">
        <p className="w-[60%] text-white tracking-wide font-medium">{text}</p>
        <span className="mr-2 flex items-center justify-center">{icon}</span>
      </div>
      <PrimaryButton
        text="Acessar"
        onClick={() => handleButtonClick(idButton, navigate)}
        id={`${idButton}_id`}
      ></PrimaryButton>
    </article>
  );
}

export default CardHomePage;

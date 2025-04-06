import { handleButtonClick } from "./CardHome.script";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function CardHomePage({ title, text, url, idButton }) {
  return (
    <article
      className="flex flex-col justify-between align-center
                                text-white p-5 w-95 h-75 bg-[#1E1E1E90]
                                border-1 border-[#9A3379] hover:border-[#02AEBA] duration-100"
    >
      <h1 className="text-[30px] tracking-widest text-[#9A3379] font-semibold w-[80%] h-[25%] flex items-center">
        {title}
      </h1>
      <div className="flex justify-between items-center">
        <p className="w-[60%] text-white tracking-wide font-medium">{text}</p>
        <img src={url} className="mr-2 w-[20%] h-[3rem]" />
      </div>
      <PrimaryButton
        text="Acessar"
        onClick={() => handleButtonClick(idButton)}
        id={`${idButton}_id`}
      ></PrimaryButton>
    </article>
  );
}

export default CardHomePage;

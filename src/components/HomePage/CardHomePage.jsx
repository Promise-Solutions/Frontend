import { handleButtonClick } from "./CardHome.script";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function CardHomePage({ title, text, url, idButton }) {
  return (
    <article
      className="flex flex-col justify-between align-center
                                text-white p-5 w-95 h-95 bg-[#1E1E1E90]
                                border-1 border-[#9A3379] hover:border-[#02AEBA] duration-100"
    >
      <h1 className="text-[30px] tracking-widest text-[#9A3379] font-semibold w-[80%] h-[30%] mt-5 flex items-center">
        {title}
      </h1>
      <div className="flex justify-between items-center">
        <p className="w-[60%] text-white tracking-wide font-medium">{text}</p>
        <img src={url} className="mr-2 w-[20%] h-[4rem]" />
      </div>
      <PrimaryButton
        text="Acessar"
        onClick={() => handleButtonClick(idButton)}
        id={`${idButton}_id`}
        className="h-[42px] ml-auto border-1 px-5 py-2 border-[#9A3379] text-[#9A3379] 
                    font-bold cursor-pointer hover:border-[#02AEBA] hover:text-[#02AEBA] duration-300"
      ></PrimaryButton>
    </article>
  );
}

export default CardHomePage;

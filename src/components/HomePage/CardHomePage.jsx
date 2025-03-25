import { handleButtonClick } from "./CardHome.script";

function CardHomePage({ title, text, url, idButton }) {
    return (
            <article className="flex flex-col justify-between align-center
                                text-[#dedede] p-5 w-95 h-95 bg-[#00000095] border-r-3
                                border-0 border-[#01585E55] hover:border-[#02AEBA88] duration-600">
             
            <h1 className="text-[30px] tracking-widest text-[#9A3379] font-semibold w-[80%] h-[30%] mt-5 flex items-center">{title}</h1 >
             <div className="flex justify-between items-center">
                <p className="w-[60%] text-[#bbb] tracking-wide font-medium">{text}</p>
                <img src={url} className="mr-2 w-[20%] h-[4rem]" />
             </div>
                <button 
                    onClick={() => handleButtonClick(idButton)}
                    id={`${idButton}_id`} 
                    className="h-[42px]  ml-auto border-1 px-5 py-2 border-[#9A3379] border-2 text-[#9A3379] rounded-md 
                    font-bold cursor-pointer hover:bg-[#9A3379] hover:text-[#000000CC] hover:border-[#9A3379] duration-300">
                    Acessar
                </button>
            </article>
            
    );
}

export default CardHomePage;
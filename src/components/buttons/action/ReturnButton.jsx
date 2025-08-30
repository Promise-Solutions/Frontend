import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const ReturnButton = ({ tamanho }) => {
  const navigate = useNavigate();
    return (
      <div
        className="w-2 block fixed z-20  h-10 cursor-pointer shadow-lg"
        onClick={() => navigate(-1)}
      >
        <div className="h-full text-cyan-zero w-full hover:text-cyan-300 items-center justify-center">
          <IoArrowBack size={tamanho || '40px'}/>
        </div>
      </div>
    );
}

export default ReturnButton;
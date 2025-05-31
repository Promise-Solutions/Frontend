import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const ReturnButton = () => {
  const navigate = useNavigate();
    return (
      <div
        className="w-2 block fixed z-20 border-r-3 border-cyan-zero h-10 hover:w-10 hover:border-r-0 transition-all duration-300 ease-in-out cursor-pointer shadow-lg"
        onClick={navigate(-1)}
      >
        <div className="h-full text-cyan-zero w-full items-center justify-center opacity-0 hover:opacity-100 flex transition-all duration-300 ease-in-out">
          <IoArrowBack size={'40px'}/>
        </div>
      </div>
    );
}

export default ReturnButton;
import ArrowBack from '../../arrows/ArrowBack'
import { useNavigate } from "react-router-dom";


const ReturnButton = () => {
    return (
      <div className="w-10 h-10 rounder-[50px]" onClick={useNavigate(-1)}>
        <img src={ArrowBack} alt="Voltar" />
      </div>
    );
}

export default ReturnButton;
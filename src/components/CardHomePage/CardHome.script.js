import { useNavigate } from "react-router-dom";

export const handleButtonClick = (id, navigate) => {
  if (typeof navigate !== "function") {
    console.error("navigate is not a function. Ensure it is passed correctly.");
    return;
  }
  navigate(`/${id}`); // Use navigate passed as an argument
};

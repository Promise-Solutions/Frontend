import { useNavigate } from "react-router-dom";

export const handleButtonClick = (route, navigate) => {
  if (typeof navigate !== "function") {
    console.error("navigate is not a function. Ensure it is passed correctly.");
    return;
  }
  navigate(route);
};

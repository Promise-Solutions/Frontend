import { showToast } from "../components/toastStyle/ToastStyle";
import { ROUTERS } from "../constants/routers";
import { axiosProvider } from "../provider/apiProvider";

export const validateSession = () => {
  const pathname = window.location.pathname;

  if (ROUTERS[pathname] === undefined) {
    return;
  }

  if (
    pathname != ROUTERS.LOGIN &&
    pathname != ROUTERS.FORGOT &&
    pathname != ROUTERS.RESET
  ) {
    const userLogged = localStorage.getItem("userLogged");

    if (userLogged == null || userLogged == "" || userLogged == undefined) {
      showToast.error("Sessão expirada, entre novamente!");
      localStorage.removeItem("token");
      localStorage.removeItem("userLogged");
      showToast.error("Para sua segurança. Faça login novamente.");
      // Removido redirecionamento duplicado, o interceptor do axios já faz isso
    } else {
      axiosProvider
        .get(`/employees/${userLogged}`)
        .then((res) => {
          if (res.status === 200) {
            showToast.success("Sessão validada!");
          }
        })
        .catch((err) => {
          showToast.error("Sessão expirada, entre novamente!");
          localStorage.removeItem("token");
          localStorage.removeItem("userLogged");
          showToast.error("Para sua segurança. Faça login novamente.");
          // Removido redirecionamento duplicado, o interceptor do axios já faz isso
        });
    }
  }
};

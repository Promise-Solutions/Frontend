import { handleLogout } from "./LogoutButton";

const LogoutButton = ({ className }) => {
  return (
    <button
      id="logout_button_id"
      className={`navBarBtn text-[cyan] font-medium border border-solid border-[cyan] cursor-pointer mx-4 mr-[64px] 
                py-4 px-7 inline-block hover:text-[#9A3379] hover:border-[#9A3379] transition duration-100 ${className}`}
      onClick={handleLogout}
    >Sair do usuário</button>
  );
}

export default LogoutButton;
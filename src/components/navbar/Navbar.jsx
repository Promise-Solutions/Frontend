import { useEffect } from "react";
import logo from "../../assets/logo-branco-bg-sonoro.png";

const Navbar = () => {
  useEffect(() => {
    const button = document.querySelector(".navBarBtn");
    button.addEventListener("click", () => {
      window.location.href = "/login";
    });
  }, []);

  return (
    <div className="navbar bg-black border-b-white border-1 flex justify-between items-center">
      <img
        src={logo}
        alt="Studio Zero"
        className="w-[156px] h-[79px] ml-[64px]"
      />
      <ul className="flex justify-between gap-6 w-[350px] items-center h-full text-white font-medium">
        <li className="cursor-pointer px-3 py-2 hover:text-[#9A3379] border-b-1 border-b-[#9A3379] transition duration-100">
          Usuários
        </li>
        <li className="cursor-pointer hover:text-[#9A3379] transition duration-100">
          Bar
        </li>
        <li className="cursor-pointer hover:text-[#9A3379] transition duration-100">
          Dashboard
        </li>
        <li className="cursor-pointer hover:text-[#9A3379] transition duration-100">
          Relatórios
        </li>
      </ul>
      <button className="navBarBtn text-[cyan] font-medium bd-[cyan] border-2 cursor-pointer mx-4 mr-[64px] py-4 px-7 inline-block transition duration-500">
        Sair do Usuário
      </button>
    </div>
  );
};

export default Navbar;

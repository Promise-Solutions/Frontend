import { useEffect, useRef } from "react";
import CardHomePage from "../../components/cards/cardHomePage/CardHomePage.jsx";
import { useNavigate } from "react-router-dom";
import { handleButtonClick } from "../../components/cards/cardHomePage/CardHome.script.js";
import UserIcon from "../../assets/iconsHomePage/icon-user.png";
import JobIcon from "../../assets/iconsHomePage/icon-servicos.png";
import BarIcon from "../../assets/iconsHomePage/icon-bar.png";
import DashIcon from "../../assets/iconsHomePage/icon-dashboard.png";
import RelatIcon from "../../assets/iconsHomePage/icon-report.png";
import CalendarIcon from "../../assets/iconsHomePage/icon-calendar.png";
import TaskIcon from "../../assets/iconsHomePage/icon-tarefas.png";
import StockIcon from "../../assets/iconsHomePage/icon-estoque.png";
import ExpenseIcon from "../../assets/iconsHomePage/icon-despesas.png";
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import LogoutButton from "../../components/buttons/logoutButton/LogoutButton.jsx";
import { ROUTERS } from "../../constants/routers.js";

// Importação do react-slick e slick-carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // Configurações do slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Faz o scroll do mouse acionar o avanço/retrocesso do slider
  const handleWheel = (e) => {
    if (!sliderRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      if (e.deltaY > 0) {
        sliderRef.current.slickNext();
      } else if (e.deltaY < 0) {
        sliderRef.current.slickPrev();
      }
    }
  };

  return (
    <main className="slide-in-ltr flex flex-col justify-center items-center min-h-[100vh] h-full w-[100vw] gap-30">
      <style>
        {`
          .slick-prev:before, .slick-next:before {
            color: var(--color-cyan-zero) !important;
            font-size: 36px !important;
          }
          .slick-dots {
            display: none !important;
          }
        `}
      </style>
      <div className="flex items-center justify-center mt-[-100px] ">
        <img src={Logo} className="h-[130px]" />
        <div className="absolute flex w-full justify-end  pr-[64px] py-4 px-12">
          <LogoutButton
            id="logout_button_id"
            text="Sair"
            onClick={() => handleLogout(navigate)}
          />
        </div>
      </div>
      {/* Slider usando react-slick */}
      <div className="w-full max-w-[90vw] px-4 py-2" onWheel={handleWheel}>
        <Slider ref={sliderRef} {...sliderSettings} className="pl-14">
          <CardHomePage
            title="Calendário"
            text="Visualize sua agenda."
            url={CalendarIcon}
            idButton={ROUTERS.CALENDAR}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.CALENDAR, navigate)}
          />
          <CardHomePage
            title="Serviços"
            text="Gerencie seus serviços e subserviços registrados."
            url={JobIcon}
            idButton={ROUTERS.JOBS}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.JOBS, navigate)}
          />
            <CardHomePage
              title="Tarefas"
              text="Obtenha uma visão de suas tarefas e gerencie seus status."
              url={TaskIcon}
              idButton={ROUTERS.TASKS}
              className="text-[42px] text-transparent font-bold"
              style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
              buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
              onClick={() => handleButtonClick(ROUTERS.TASKS, navigate)}
            />
          <CardHomePage
            title="Bar"
            text="Visualize e gerencie as comandas e pedidos dos seus clientes."
            url={BarIcon}
            idButton={ROUTERS.BAR}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.BAR, navigate)}
          />
          <CardHomePage
            title="Estoque"
            text="Visualize e gerencie os produtos presentes em seu estoque."
            url={StockIcon}
            idButton={ROUTERS.BAR_STOCK}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.BAR_STOCK, navigate)}
          />
          <CardHomePage
            title="Despesas"
            text="Visualize e gerencie suas despesas."
            url={ExpenseIcon}
            idButton={ROUTERS.EXPENSES}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.EXPENSES, navigate)}
          />
          <CardHomePage
            title="Análise"
            text="Acompanhe dados, métricas e tendências em tempo real."
            url={DashIcon}
            idButton={ROUTERS.DASHBOARD}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.DASHBOARD, navigate)}
          />
          <CardHomePage
            title="Relatórios"
            text="Visualize seus relatórios existentes ou gere novos."
            url={RelatIcon}
            idButton={ROUTERS.REPORTS}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.REPORTS, navigate)}
          />
          <CardHomePage
            title="Usuários"
            text="Gerencie seus usuários e visualize seus serviços e indicadores."
            url={UserIcon}
            idButton={ROUTERS.USERS}
            className="text-[42px] text-transparent font-bold"
            style={{ WebkitTextStroke: "2px #02aebaff" }}
            buttonStyle={{ backgroundColor: "#02aebaff" }}
            onClick={() => handleButtonClick(ROUTERS.USERS, navigate)}
          />
        </Slider>
      </div>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

import { useRef, useState } from "react";
import CardHomePage from "../../components/cards/cardHomePage/CardHomePage.jsx";
import { useNavigate } from "react-router-dom";
import { handleButtonClick } from "../../components/cards/cardHomePage/CardHome.script.js";
import {
  MdCalendarToday,
  MdBuild,
  MdAssignment,
  MdLocalBar,
  MdInventory,
  MdAttachMoney,
  MdDashboard,
  MdAssessment,
  MdPeople,
} from "react-icons/md";
import Logo from "../../assets/logo-branco-bg-sonoro.png";
import { handleLogout } from "./Home.script.js";
import LogoutButton from "../../components/buttons/action/logoutButton/LogoutButton.jsx";
import { ROUTERS } from "../../constants/routers.js";

// Importação do react-slick e slick-carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentTab, setCurrentTab] = useState(0);

  // Slides e responsividade
  const totalSlides = 9;
  const defaultSlidesToShow = 4;
  const responsive = [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ];

  // Calcula slidesToShow atual a partir do sliderRef (fallback para default)
  const getCurrentSlidesToShow = () => {
    if (
      sliderRef.current &&
      sliderRef.current.innerSlider &&
      sliderRef.current.innerSlider.props
    ) {
      return sliderRef.current.innerSlider.props.slidesToShow;
    }
    return defaultSlidesToShow;
  };

  // Configurações do slider
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: defaultSlidesToShow,
    slidesToScroll: defaultSlidesToShow - 1 > 0 ? defaultSlidesToShow - 1 : 1,
    responsive,
    afterChange: (current) => {
      const slidesToShow = getCurrentSlidesToShow();
      const tabCount = Math.ceil(totalSlides / slidesToShow);
      const lastTabIndex = tabCount - 1;
      if (current >= totalSlides - slidesToShow) {
        setCurrentTab(lastTabIndex);
      } else {
        setCurrentTab(Math.floor(current / slidesToShow));
      }
    },
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

  // Calcula tabCount dinamicamente para as bolinhas
  const slidesToShow = getCurrentSlidesToShow();
  const tabCount = Math.ceil(totalSlides / slidesToShow);

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
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Slider usando react-slick */}
      <div className="w-full max-w-[90vw] px-4 py-2" onWheel={handleWheel}>
        <Slider ref={sliderRef} {...sliderSettings} className="pl-14">
          <CardHomePage
            title="Calendário"
            text="Visualize sua agenda."
            icon={<MdCalendarToday className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.CALENDAR}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.CALENDAR, navigate)}
          />
          <CardHomePage
            title="Serviços"
            text="Gerencie seus serviços e subserviços registrados."
            icon={<MdBuild className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.JOBS}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.JOBS, navigate)}
          />
          <CardHomePage
            title="Tarefas"
            text="Obtenha uma visão de suas tarefas e gerencie seus status."
            icon={<MdAssignment className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.TASKS}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.TASKS, navigate)}
          />
          <CardHomePage
            title="Bar"
            text="Visualize e gerencie as comandas e pedidos dos seus clientes."
            icon={<MdLocalBar className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.BAR}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.BAR, navigate)}
          />
          <CardHomePage
            title="Estoque"
            text="Visualize e gerencie os produtos presentes em seu estoque."
            icon={<MdInventory className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.BAR_STOCK}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.BAR_STOCK, navigate)}
          />
          <CardHomePage
            title="Despesas"
            text="Visualize e gerencie suas despesas."
            icon={<MdAttachMoney className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.EXPENSES}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.EXPENSES, navigate)}
          />
          <CardHomePage
            title="Análise"
            text="Acompanhe dados, métricas e tendências em tempo real."
            icon={<MdDashboard className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.DASHBOARD}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.DASHBOARD, navigate)}
          />
          <CardHomePage
            title="Relatórios"
            text="Visualize seus relatórios existentes ou gere novos."
            icon={<MdAssessment className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.REPORTS}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px var(--color-cyan-zero)" }}
            buttonStyle={{ backgroundColor: "var(--color-cyan-zero)" }}
            onClick={() => handleButtonClick(ROUTERS.REPORTS, navigate)}
          />
          <CardHomePage
            title="Usuários"
            text="Gerencie seus usuários e visualize seus serviços e indicadores."
            icon={<MdPeople className="w-16 h-16 text-cyan-500" />}
            idButton={ROUTERS.USERS}
            className="text-[42px] text-transparent font-bold cursor-pointer"
            style={{ WebkitTextStroke: "2px #02aebaff" }}
            buttonStyle={{ backgroundColor: "#02aebaff" }}
            onClick={() => handleButtonClick(ROUTERS.USERS, navigate)}
          />
        </Slider>
        {/* Removido o indicador de tabs */}
      </div>
    </main>
  );
};

// Exportando o componente Home para uso em rotas ou outras partes da aplicação
// Permite que o componente seja utilizado em outros arquivos
export default Home;

import { useRef, useState, useEffect } from "react";
import { matchPath, BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/navbar/Navbar";
import Background from "./assets/background_backoffice_studiozero.mp4";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "./context/GlobalProvider";
import Play from "./assets/play.png";
import Pause from "./assets/pause.png";
import { FaRegClock } from "react-icons/fa";
import { validateSession } from "./hooks/validateSession";
import { ROUTERS } from "./constants/routers";

function App() {
  const videoRef = useRef(null); // Referência para o vídeo
  const [isPlaying, setIsPlaying] = useState(true); // Estado para controlar play/pause
  const [now, setNow] = useState(new Date());
  const [minimizedClock, setMinimizedClock] = useState(false);
  const [hoveredClock, setHoveredClock] = useState(false);

    useEffect(() => {
      validateSession();
    }, []);

  // Função para pausar/reproduzir o vídeo
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Atualiza o relógio a cada segundo se expandido, senão a cada minuto
  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(
      () => setNow(new Date()),
      hoveredClock && !minimizedClock ? 1000 : 60000
    );
    return () => clearInterval(interval);
  }, [hoveredClock, minimizedClock]);


  return (
    <GlobalProvider>
      <Router>
        <div className="flex min-h-screen min-w-screen flex-col overflow-y-hidden">
          {/* Vídeo de fundo */}
          <video
            ref={videoRef}
            className="fixed inset-0 w-full h-full object-cover"
            src={Background}
            autoPlay
            loop
            muted
            disablePictureInPicture
          />

          {/* Botão de controle do vídeo */}
          <button
            title="Pausar Video de Fundo"
            onClick={toggleVideo}
            className="fixed bottom-4 cursor-pointer left-4 z-20 bg-black/50 text-white px-4 py-2 border-1 border-pink-zero hover:bg-black/70 transition"
          >
            <img
              src={isPlaying ? Pause : Play} // Alterna entre os ícones
              alt={isPlaying ? "Pause" : "Play"}
              className="w-6 h-6" // Ajuste o tamanho conforme necessário
            />
          </button>

          <div
            className="fixed bottom-4 right-4 cursor-pointer z-20 bg-black/50 text-white px-4 py-2 border-1 border-pink-zero hover:bg-black/70 transition"
            onMouseEnter={() => setHoveredClock(true)}
            onMouseLeave={() => setHoveredClock(false)}
            onClick={() => setMinimizedClock((prev) => !prev)}
            title={
              minimizedClock ? "Clique para expandir" : "Clique para minimizar"
            }
            style={{
              minWidth: minimizedClock ? 48 : undefined,
              minHeight: minimizedClock ? 48 : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {minimizedClock ? (
              // Mostra apenas um ícone ou texto simples quando minimizado
              <span
                className="text-lg select-none"
                title="Clique para expandir"
              >
                <FaRegClock />
              </span>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-sm">
                  {now.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    ...(hoveredClock && { second: "2-digit" }),
                  })}
                </p>
                <p className="text-sm">
                  {now.toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
                {hoveredClock && (
                  <p className="text-xs mt-1">
                    {now.toLocaleDateString("pt-BR", {
                      weekday: "long",
                    })}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Render Navbar and Routes */}
          <div className="relative z-10">
            <NavbarWrapper />
            <AppRoutes />
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </Router>
    </GlobalProvider>
  );
}

const NavbarWrapper = () => {
  const { pathname } = useLocation();

  // Rotas onde a Navbar não deve aparecer
  const hideNavbarRoutes = [
    ROUTERS.LOGIN,
    ROUTERS.RESET,
    ROUTERS.FORGOT,
    ROUTERS.HOME,
    ROUTERS.HOME_ALIAS
  ];

  // Extrai só os valores de rota que são strings (ignora as funções getX)
  const routePatterns = Object.values(ROUTERS).filter(
    (r) => typeof r === "string"
  );

  // Verifica se o pathname atual bate com algum padrão de rota
  const isKnownRoute = routePatterns.some((pattern) =>
    matchPath({ path: pattern, end: true }, pathname)
  );

  const shouldShowNavbar = isKnownRoute && !hideNavbarRoutes.includes(pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

export default App;

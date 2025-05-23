import { useRef, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom"; // Import Router and useLocation
import AppRoutes from "./routes";
import Navbar from "./components/navbar/Navbar";
import Background from "./assets/background_backoffice_studiozero.mp4";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "./context/GlobalProvider";
import Play from "./assets/play.png";
import Pause from "./assets/pause.png";

function App() {
  const videoRef = useRef(null); // Referência para o vídeo
  const [isPlaying, setIsPlaying] = useState(true); // Estado para controlar play/pause

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

          <div className="fixed bottom-4 right-4 cursor-pointer z-20 bg-black/50 text-white px-4 py-2 border-1 border-pink-zero hover:bg-black/70 transition">
            {/* Hora e Data */}
            <div className="flex flex-col items-center">
                <p className="text-sm">
                  {new Date().toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              <p className="text-sm">
                {new Date().toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>
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
  const { pathname } = useLocation(); // Move useLocation here
  return pathname !== "/login" && pathname !== "/home" && pathname !== "/" ? (
    <Navbar />
  ) : null; // Conditionally render Navbar
};

export default App;

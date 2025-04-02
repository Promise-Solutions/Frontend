import { useRef, useState } from "react";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Background from "./assets/background_backoffice_studiozero.mp4";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "./context/GlobalProvider";
import Play from "./assets/play.png"
import Pause from "./assets/pause.png"

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
      <div
        className="flex min-h-screen min-w-screen flex-col"
      >
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
          onClick={toggleVideo}
          className="fixed bottom-4 cursor-pointer right-4 z-20 bg-black/50 text-white px-4 py-2 border-1 border-pink-zero hover:bg-black/70 transition"
        >
          <img
            src={isPlaying ? Pause : Play} // Alterna entre os ícones
            alt={isPlaying ? "Pause" : "Play"}
            className="w-6 h-6" // Ajuste o tamanho conforme necessário
          />
        </button>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10">
          <Navbar />
          <AppRoutes />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;

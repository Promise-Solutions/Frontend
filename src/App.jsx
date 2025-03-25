import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Background from "./assets/background.png";
import { UserProvider } from "./context/UserContext"; // <-- importa o provider
import { Toaster } from "react-hot-toast"; // <-- lib de notificação bunitinha :3

function App() {
  return (
    //UserProvider tbm vem do contexto, precisamos envolver ele na aplicação para o contexto funcionar em toda a aplicação
    <UserProvider>
      <div
        className="min-h-screen min-w-full bg-black"
        style={{
          background: `url(${Background}) no-repeat center center/cover`,
        }}
      >
        <Navbar />
        <AppRoutes />
        {/* //Toaster é só pra n usar o alert, ai fica mais bonitinho e n perde
        tempo estilizando o alert */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </UserProvider>
  );
}

export default App;

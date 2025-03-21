import AppRoutes from "./routes";
import Navbar from "./components/navbar/Navbar";
import Background from "./assets/background.png";

function App() {
  return (
    <div className="min-h-screen min-w-full bg-black" style={{ background: `url(${Background}) no-repeat center center/cover` }}>
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;

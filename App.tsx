import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/EditarNota";
import Sobre from "./pages/TelaVisualizar";
import Contato from "./pages/TelaPerfil";
import CriarNota from "./pages/CriarNota";
import TelaInicial from "./pages/TelaInicial";


function App() {
  return (
    <div>
      <nav>
        <Link to="/inicio">Tela Inicial</Link> |{" "}
        <Link to="/criar">Criar Nota</Link> | {""}
        <Link to="/">EditarNotar</Link> |{" "}
        <Link to="/sobre">TelaVisualizar</Link> |{" "}
        <Link to="/contato">Perfil</Link>
      </nav>

      <hr />

      <Routes>
        
        <Route path="/inicio" element={<TelaInicial />} />
        <Route path="/criar" element={<CriarNota />} />
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        {/* Rota curinga (página não encontrada) */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;

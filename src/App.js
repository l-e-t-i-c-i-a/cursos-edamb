import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Cursos e Treinamentos</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Criar Novo Curso</Link>
        <a href="https://thaynarlt.github.io/SiteEducacaoAmbiental-P2/">EDAMB.br</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
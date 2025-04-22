import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/login/login.jsx";
import Register from "../auth/Register/register.jsx";
import Home from "../features/Home/home.jsx";
import Students from "../features/pages/students/students.jsx";
import Careers from "../features/pages/careers/careers.jsx";
import Researchers from "../features/pages/Researchers/researchers.jsx";
import Proyects from "../features/pages/proyects/proyects.jsx";
import Areas from "../features/pages/areas/areas.jsx";
import Especiality from "../features/pages/especiality/especiality.jsx";
import Investigation from "../features/pages/investigation/investigation.jsx";
import Events from "../features/pages/events/events.jsx";
import Articles from "../features/pages/articles/articles.jsx";
import Tools from "../features/pages/tools/tools.jsx";
import Unidades from "../features/pages/unidades/unidades.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/estudiantes" element={<Students />}></Route>
        <Route path="/carreras" element={<Careers />}></Route>
        <Route path="/investigadores" element={<Researchers />}></Route>
        <Route path="/proyectos" element={<Proyects />}></Route>
        <Route path="/areas" element={<Areas />}></Route>
        <Route path="/especialidades" element={<Especiality />}></Route>
        <Route path="lineas-investigacion" element={<Investigation />}></Route>
        <Route path="/eventos" element={<Events />}></Route>
        <Route path="/articulos" element={<Articles />}></Route>
        <Route path="/herramientas" element={<Tools />}></Route>
        <Route path="/unidades" element={<Unidades />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Students from "./pages/students/students.jsx";
import Careers from "./pages/careers/careers.jsx";
import Researchers from "./pages/Researchers/researchers.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/estudiantes" element={<Students />}></Route>
        <Route path="/carreras" element={<Careers />}></Route>
        <Route path="/investigadores" element={<Researchers />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

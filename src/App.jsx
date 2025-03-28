import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/home.jsx";
import Students from "./pages/students/students.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/estudiantes" element={<Students />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

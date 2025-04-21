import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";

/*
CREDENCIALS FOR LOGIN TESTING
Name: Juan Pérez                | Name: Maria Torres
Email: juan.perez@example.com   | Email: maria.torres@example.com
Password: 12345                 | Password: mypass2025
Credential: Guest               | Credential: Admin
*/

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica si el usuario ya inició sesión
  useEffect(() => {
    const idusuario = localStorage.getItem("idusuario");
    if (idusuario) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login-api/",
        formData
      );
      if (response.data.status === "success") {
        localStorage.setItem("idusuario", response.data.usuario_id);
        setIsLoggedIn(true);
        setError("");
        window.location.href = "/";
      }
    } catch {
      setError("Credenciales incorrectas");
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
            className="login-input"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}
            required
            className="login-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;

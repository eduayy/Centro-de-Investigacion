import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        "http://localhost:8000/api/login/",
        formData
      );

      if (response.data.status === "success") {
        localStorage.setItem("usuario_id", response.data.usuario_id);
        setIsLoggedIn(true);
        setError("");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return (window.location.href = "/");
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

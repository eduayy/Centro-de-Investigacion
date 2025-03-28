import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verify if the user is already logged in
  useEffect(() => {
    const userId = localStorage.getItem("usuario_id");
    if (userId) {
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
        "http://localhost:8000/api/login/",
        formData
      );

      // Save userId, name and permissions in localStorage
      if (response.data.status === "success") {
        localStorage.setItem("usuario_id", response.data.usuario_id);
        localStorage.setItem("nombre", response.data.nombre);
        localStorage.setItem("permisos", response.data.permisos);
        setIsLoggedIn(true);
        setError("");
      }
    } catch (err) {
      setIsLoggedIn(false);
      setError("Invalid credentials");
    }
  };

  if (isLoggedIn) {
    return (window.location.href = "/"); // If user is already loggedin, redirect to home page
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

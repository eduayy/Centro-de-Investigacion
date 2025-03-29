import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";

/*
Credentials for testing purposes:
User as a guest:              |   User as a researcher:
Name: Juan Peréz              |   Name: María Torres
Email: juan.perez@example.com |   Email: maria.torres@example.com
Password: 123456              |   Password: mypass2025
Permissions: 1                |   Permissions: 3
*/

/*
Herarchy of permissions:
1: Admin
2: Researcher
3: Student
4: Guest
*/

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verify if the user is already logged in
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
        // Get fields of user that are relevant for the app
        localStorage.setItem("idusuario", response.data.idusuario);
        localStorage.setItem("idpermiso", response.data.idpermiso);
        localStorage.setItem(
          "idpermiso",
          JSON.stringify(response.data.idpermiso)
        );
        setIsLoggedIn(true);
        setError("");
      }
    } catch (err) {
      setError("Incorrect credentials");
      setIsLoggedIn(false);
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

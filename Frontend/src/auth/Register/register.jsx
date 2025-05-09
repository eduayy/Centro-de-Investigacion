import { useState } from "react";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmContrasena: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contrasena !== formData.confirmContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          contrasena: formData.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Registro exitoso!");
        // Aquí podrías redirigir al login
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Error de conexión");
      console.error(error);
    }
  };

  return (
    <main className="main-content">
      <div className="register-form">
        <div className="register-title">
          <img
            src="src/assets/images/image.png"
            alt="ciateq-icon"
            style={{ width: "180px", height: "60px" }}
          />
          <h4 style={{ fontSize: "35px", margin: "4px 0", fontWeight: "bold", color: "black" }}>
            Create your account
          </h4>
          <p style={{ fontSize: "14px", margin: "4px 0", color: "#718096" }}>
            Signup now and get full access to our app.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form-inputs">
          <label>
            <input type="text" name="nombre" placeholder="Name" required onChange={handleChange} />
          </label>
          <label>
            <input type="text" name="correo" placeholder="Email" required onChange={handleChange} />
          </label>
          <label>
            <input type="password" name="contrasena" placeholder="Password" required onChange={handleChange} />
          </label>
          <label>
            <input type="password" name="confirmContrasena" placeholder="Confirm password" required onChange={handleChange} />
          </label>
          <button type="submit" className="register-user-btn" style={{ color: "white", fontWeight: "bold" }}>
            Submit →
          </button>
        </form>
        <p className="register-redirect">
          Already have an account? <a href="/login">Signin</a>
        </p>
      </div>
    </main>
  );
}

export default Register;

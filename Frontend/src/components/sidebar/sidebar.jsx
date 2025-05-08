import { Link } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";

// Menu items for sidebar
const menuList = [
  { name: "Load data", action: "loadData" }, 
  { name: "Inicio", path: "/" },
  { name: "Carreras", path: "/carreras" },
  { name: "Estudiantes", path: "/estudiantes" },
  { name: "Investigadores", path: "/investigadores" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Areas", path: "/areas" },
  { name: "Unidades", path: "/unidades" },
  { name: "Especialidades", path: "/especialidades" },
  { name: "Lineas Investigación", path: "/lineas-investigacion" },
  { name: "Eventos", path: "/eventos" },
  { name: "Articulos", path: "/articulos" },
  { name: "Herramientas", path: "/herramientas" },
];

const Sidebar = () => {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Data Loading Function
  const cargarBaseDeDatos = async () => {
    if (loading) return; // Avoid multiple clicks while loading
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/restaurar-bd/", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); 
      } else {
        setError(data.error || "Error desconocido al restaurar la base de datos.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = localStorage.getItem("idusuario");

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuList.map((item, index) => (
            <li key={index}>
              {/* Si el nombre es "Load data", se debe ejecutar la lógica */}
              {item.name === "Load data" ? (
                <button onClick={cargarBaseDeDatos} disabled={loading}>
                  {loading ? "Cargando..." : item.name}
                </button>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
              <hr />
            </li>
          ))}

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
                <hr />
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
                <hr />
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  // Eliminar permisos e idusuario de localStorage
                  e.preventDefault();
                  localStorage.removeItem("idusuario");
                  localStorage.removeItem("idpermiso");
                  window.location.href = "/";
                }}
                className="logout-link"
              >
                Cerrar Sesión
              </Link>
              <hr />
            </li>
          )}
        </ul>
      </nav>

      {error && <p className="error-message">{error}</p>} {/* Mostrar mensajes de error si los hay */}
    </aside>
  );
};

export default Sidebar;

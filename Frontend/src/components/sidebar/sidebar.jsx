import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const menuList = [
  { name: "Cargar datos", action: "loadData" },
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
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("idusuario");

  const cargarBaseDeDatos = async () => {
    if (loading) return;
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
        setError(data.error || "Error al restaurar la base de datos");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="sidebar-static">
      <div className="sidebar-header">
        <h3>CIATEQ</h3>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-items">
          {menuList.map((item, index) => (
            <li key={index} className="menu-item">
              {item.action ? (
                <button
                  onClick={cargarBaseDeDatos}
                  disabled={loading}
                  className={`menu-button ${loading ? "loading" : ""}`}
                >
                  {loading ? (
                    <>
                      <span className="loader"></span>
                      Cargando...
                    </>
                  ) : (
                    item.name
                  )}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`menu-button ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="auth-section">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="auth-link login">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="auth-link register">
                Registrarse
              </Link>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("idusuario");
                localStorage.removeItem("idpermiso");
              }}
              className="auth-link logout"
            >
              Cerrar Sesión
            </Link>
          )}
        </div>
      </nav>

      {error && <div className="error-message">{error}</div>}
    </aside>
  );
};

export default Sidebar;

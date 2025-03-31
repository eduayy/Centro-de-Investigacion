import { Link } from "react-router-dom";
import "./sidebar.css";

// Menu items for sidebar
const menuList = [
  { name: "Inicio", path: "/" },
  { name: "Carreras", path: "/carreras" },
  { name: "Estudiantes", path: "/estudiantes" },
  { name: "Investigadores", path: "/investigadores" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Areas", path: "/areas" },
  { name: "Especialidades", path: "/especialidades" },
  { name: "Lineas Investigación", path: "/lineas-investigacion" },
  { name: "Eventos", path: "/eventos" },
  { name: "Articulos", path: "/articulos" },
  { name: "Herramientas", path: "/herramientas" },
  { name: "Categorías", path: "/categorias" },
];

const Sidebar = () => {
  // verify if the user is already logged in and permissions
  const isLoggedIn = localStorage.getItem("idusuario");

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuList.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
              <hr></hr>
            </li>
          ))}

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
                <hr />
              </li>
              <li>
                <Link to="/registro">Registrarse</Link>
                <hr />
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  // Delete permissions and user_id from localStorage
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
    </aside>
  );
};

export default Sidebar;

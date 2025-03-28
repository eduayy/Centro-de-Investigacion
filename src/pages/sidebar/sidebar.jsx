import { Link } from "react-router-dom";
import "./sidebar.css";

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

// Menu items for sidebar
const menuList = [
  { name: "Inicio", path: "/" },
  { name: "Empleados", path: "/empleados" },
  { name: "Estudiantes", path: "/estudiantes" },
  { name: "Proyectos", path: "/proyectos" },
  { name: "Areas", path: "/areas" },
  { name: "Especialidades", path: "/especialidades" },
  { name: "Lineas Investigación", path: "/lineas-investigacion" },
  { name: "Eventos", path: "/eventos" },
  { name: "Articulos", path: "/articulos" },
  { name: "Unidades", path: "/unidades" },
  { name: "Tipo de Eventos", path: "/tipo-eventos" },
  { name: "Tipo de Proyectos", path: "/tipo-proyectos" },
  { name: "Nivel de Estudios", path: "/nivel-estudios" },
  { name: "Categorías", path: "/categorias" },
];

const Sidebar = () => {
  // verify if the user is already logged in and permissions
  const isLoggedIn = localStorage.getItem("usuario_id");

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
                  localStorage.removeItem("usuario_id");
                  localStorage.removeItem("permisos");
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

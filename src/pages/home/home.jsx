import { Link } from "react-router-dom";
import "./home.css";

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
  { name: "Iniciar Sesión", path: "/login" },
  { name: "Registrarse", path: "/registro" },
];

function Home() {
  return (
    <div className="Home">
      <aside className="sidebar">
        <nav>
          <ul>
            {menuList.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
                <hr></hr>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="container">Contenido principal</div>
    </div>
  );
}

export default Home;

import "./home.css";
import Sidebar from "../../components/sidebar/sidebar.jsx";

function Home() {
  return (
    <div className="Main">
      <Sidebar />
      <div className="Home">
        <section className="container-info">
          <img src="./src/assets/images/image.png"></img>
          <h1>CENTRO DE INVESTIGACIÓN JALISCO</h1>
        </section>
        <section className="container-video">
          <div className="section-info">
            <h1>Quienes Somos</h1>
            <p>
              CIATEQ fundado en noviembre de 1978, es un Centro Público de
              Investigación especializado en manufactura avanzada y procesos
              industriales que realiza servicios, proyectos de desarrollo
              tecnológico, investigación aplicada y formación de Recursos
              Humanos para contribuir a elevar la competitividad de nuestros
              clientes. Formamos parte de la Secretaría de Ciencia, Humanidades,
              Tecnología e Innovación (Secihti), institución del Gobierno de
              México (2024-2030) que formula y conduce la política nacional en
              la materia; articula y coordina las capacidades, los
              conocimientos, recursos y el talento de las personas
              investigadoras y tecnólogas para consolidar un Sistema Nacional
              científico, humanístico, tecnológico y de innovación. Nuestras
              instalaciones se concentran en siete estados de la República
              Mexicana, lo que nos permite tener cobertura nacional. La oferta
              tecnológica que ofrecemos es integral en cada Unidad, y consta de
              seis áreas de especialidad, contando con las capacidades para
              apoyar el desarrollo de los diferentes sectores de la industria
              como agua, salud, energía, aeronáutico, alimentos, automotriz y
              autopartes, electrodomésticos, comunicaciones y transportes,
              energético, hidrocarburos, maquinaria y equipo, entre otros.
              Poseemos importantes capacidades humanas y de infraestructura para
              el diseño, modelación y fabricación de herramentales empleados en
              diversas industrias.
            </p>
          </div>
          <iframe
            className="video-ciatq"
            src="https://www.youtube.com/embed/8n7foYEXbg4?si=CitGZ_Rat8edWsW7"
            title="Ciateq timeline video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>
      </div>
    </div>
  );
}

export default Home;

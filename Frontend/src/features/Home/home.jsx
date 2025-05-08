import "./home.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";
import image from "@/assets/images/image.png";
import Dashboard from "@/components/Dashboard/Dasboard.jsx";
import { useEffect, useState } from "react";
import { getResearcherInfo } from "../../components/Dashboard/DashboardFetch"; 

function Home() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getResearcherInfo();
        setStats(data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="Main">
      <Sidebar
        isVisible={sidebarVisible}
        onToggle={() => setSidebarVisible(!sidebarVisible)}
      />
      <div className="Home">
        <section className="container-info">
          <img src={image} alt="Imagen del Home" className="home-logo" />
          <h1 className="home-title">CENTRO DE INVESTIGACIÓN JALISCO</h1>
        </section>

        <section className="container-video">
          <div className="section-info">
            <h2>¿Quiénes Somos?</h2>
            <p>
              CIATEQ, fundado en noviembre de 1978, es un Centro Público de
              Investigación especializado en manufactura avanzada y procesos
              industriales. Realiza servicios, proyectos de desarrollo
              tecnológico, investigación aplicada y formación de Recursos
              Humanos para elevar la competitividad de nuestros clientes.
            </p>
            <p>
              Formamos parte de la Secretaría de Ciencia, Humanidades,
              Tecnología e Innovación (Secihti), del Gobierno de México
              (2024-2030).
            </p>
          </div>

          <div className="video-wrapper">
            <iframe
              className="video-ciatq"
              src="https://www.youtube.com/embed/8n7foYEXbg4?si=CitGZ_Rat8edWsW7"
              title="Ciateq timeline video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className="dashboard-section">
          {stats && <Dashboard stats={stats} />}
        </section>
      </div>
    </div>
  );
}

export default Home;

import "../style/researchers.css";
import Dashboard from "../../../../components/Dashboard/Dasboard";
import { useEffect, useState } from "react";
import { getResearcherInfo } from "../../../../components/Dashboard/DashboardFetch.js";

function ResearchersStat({ investigador, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (investigador) {
      const fetchStats = async () => {
        setLoading(true);
        try {
          const statsData = await getResearcherInfo(investigador.id);
          setStats(statsData);
        } catch (err) {
          setError("Error al cargar estadísticas");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [investigador]);

  if (!investigador) return null;

  return (
    <div className="stats-popup">
      <div className="stats-header">
        <h3>Estadísticas de {investigador.nombre}</h3>
        <button className="close-stats-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="stats-content">
        {loading && <p>Cargando estadísticas...</p>}
        {error && <p className="error-message">{error}</p>}
        {stats && (
          <div className="stats-dashboard">
            <Dashboard stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResearchersStat;

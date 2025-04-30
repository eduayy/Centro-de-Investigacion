import "../style/researchers.css";
import Dashboard from "../../../../components/Dashboard/Dasboard";

function ResearchersStat({ investigador, onClose }) {
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
        {Dashboard && (
          <div className="stats-dashboard">
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResearchersStat;

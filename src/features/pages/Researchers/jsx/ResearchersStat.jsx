import "../style/researchers.css";

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
      <div className="stats-content"></div>
    </div>
  );
}

export default ResearchersStat;

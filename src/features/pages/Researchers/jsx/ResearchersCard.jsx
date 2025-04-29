import React, { useState } from "react";
import ResearchersStat from "./ResearchersStat.jsx";
import "../style/researchers.css";

const ResearchersCard = ({ investigador, selectedResearcher, onClose }) => {
  const [showStats, setShowStats] = useState(false);
  if (!investigador) return null;

  console.log(onClose);

  return (
    <main className="background-container">
      <div className={`researcher-card ${showStats ? "stats-open" : ""}`}>
        <div className="researcher-data-header">
          <h3 style={{ fontStyle: "italic" }}>Detalles del Investigador</h3>
          <div>
            <button
              className="open-researcher-stats"
              onClick={() => setShowStats(true)}
            >
              Info
            </button>
            <button className="close-researcherCard-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <section className="about-researcher">
          <img src="src\assets\images\PERFIL-VACIO.png" alt="empty-photo"></img>
          <p>
            <strong
              style={{
                color: "black",
                fontStyle: "normal",
              }}
            >
              About me
            </strong>
            <hr></hr>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus delectus laboriosam eum doloribus quos. Et ducimus
            recusandae aperiam illum tempore.
          </p>
        </section>
        <section className="researcher-info">
          {selectedResearcher && (
            <div className="researcher-details">
              <div className="detail-row">
                <span className="detail-label">Nombre:</span>
                <span className="detail-value">
                  {selectedResearcher.nombre || (
                    <span className="empty-field">No especificado</span>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Teléfono:</span>
                <span className="detail-value">
                  {selectedResearcher.telefono || (
                    <span className="empty-field">No especificado</span>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Correo:</span>
                <span className="detail-value email">
                  {selectedResearcher.email || (
                    <span className="empty-field">No especificado</span>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Puesto:</span>
                <span className="detail-value">Investigador</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Área:</span>
                <span className="detail-value">
                  {selectedResearcher.area || (
                    <span className="empty-field">Sin área asignada</span>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Nivel Edu:</span>
                <span className="detail-value">
                  {selectedResearcher.nivelEdu || (
                    <span className="empty-field">No especificado</span>
                  )}
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
      {showStats && (
        <ResearchersStat
          investigador={investigador}
          onClose={() => setShowStats(false)}
        />
      )}
    </main>
  );
};

export default ResearchersCard;

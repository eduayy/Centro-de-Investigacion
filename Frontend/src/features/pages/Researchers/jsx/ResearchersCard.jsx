import React from "react";
import "../style/ResearchersCard.css";

const ResearchersCard = ({ investigador, onClose }) => {
  console.log("Datos recibidos en Card:", {
    investigador,
    tieneNombre: !!investigador?.nombre,
    tieneTelefono: !!investigador?.telefono,
    tieneEmail: !!investigador?.email,
  });

  if (!investigador) {
    return (
      <div className="background-container">
        <div className="researcher-card error-card">
          <h3>Error: No hay datos del investigador</h3>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  const {
    nombre = "No especificado",
    telefono = "No proporcionado",
    email = "Sin correo",
    puesto = "Investigador",
    linea = "Sin linea asignada",
    cantidadProy = 0,
    area = "Sin área asignada",
    nivelEdu = "No especificado",
  } = investigador;

  return (
    <main className="background-container">
      <div className="researcher-card">
        <div className="researcher-data-header">
          <h3>Detalles del Investigador</h3>
          <button className="close-researcherCard-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <section className="researcher-info">
          <div className="researcher-details">
            <div className="detail-row">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{nombre}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">{telefono}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Correo:</span>
              <span className="detail-value email">{email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Puesto:</span>
              <span className="detail-value">{puesto}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Proyectos:</span>
              <span className="detail-value">{cantidadProy}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Área:</span>
              <span className="detail-value">{area}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Nivel Edu:</span>
              <span className="detail-value">{nivelEdu}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Línea de investigación:</span>
              <span className="detail-value">{linea}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResearchersCard;

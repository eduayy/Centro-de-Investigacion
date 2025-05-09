import React from "react";
import "./StudentsCard.css";

const StudentCard = ({
  student,
  carreraNombre,
  investigadorAsignado,
  onClose,
}) => {
  return (
    <div className="student-card-modal">
      <div className="student-card-header">
        <div className="student-avatar">
          <div className="avatar-circle">
            {student.nombreestudiante?.charAt(0).toUpperCase() || ""}
            {student.apellidoestudiante?.charAt(0).toUpperCase() || ""}
          </div>
        </div>
        <h3>
          {student.nombreestudiante} {student.apellidoestudiante}
        </h3>
        <p className="student-id">ID: {student.idestudiantes}</p>
        <button className="close-icon-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="student-card-content">
        <div className="info-section">
          <h4>Información Académica</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🎓</span>
              <div>
                <p className="info-label">Carrera</p>
                <p className="info-value">
                  {carreraNombre && carreraNombre.trim() !== ""
                    ? carreraNombre
                    : "No especificada"}
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">👨‍🏫</span>
              <div>
                <p className="info-label">Investigador</p>
                <p className="info-value">
                  {investigadorAsignado || "No asignado"}
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">{student.emailestudiante}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h4>Información Personal</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <p className="info-label">Teléfono</p>
                <p className="info-value">
                  {student.telefonoestudiante || "No especificado"}
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div>
                <p className="info-label">Fecha Ingreso</p>
                <p className="info-value">
                  {student.fechaingreso || "No especificada"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="student-card-footer">
        <button className="close-action-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default StudentCard;

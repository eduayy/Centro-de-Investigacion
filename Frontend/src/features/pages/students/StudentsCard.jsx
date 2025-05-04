import React from "react";
import "./StudentsCard.css";

const StudentPopup = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Detalles del Estudiante</h3>
        <p>
          <strong>Nombre:</strong> {student.nombreestudiante}
        </p>
        <p>
          <strong>Apellido:</strong> {student.apellidoestudiante}
        </p>
        <p>
          <strong>Email:</strong> {student.emailestudiante}
        </p>
        <p>
          <strong>Teléfono:</strong> {student.telefonoestudiante}
        </p>
        <p>
          <strong>Fecha de Ingreso:</strong> {student.fechaingreso}
        </p>
        <p>
          <strong>Fecha Fin de Contrato:</strong> {student.fechafincontrato}
        </p>
        <p>
          <strong>Estatus:</strong> {student.estatus ? "Activo" : "Inactivo"}
        </p>
        <p>
          <strong>Tipo de Estudiante:</strong> {student.idtipoestudiante}
        </p>
        <p>
          <strong>Carrera:</strong> {student.idcarreras}
        </p>
        <p>
          <strong>Investigador:</strong> {student.idinvestigadores}
        </p>

        <div className="popup-actions">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default StudentPopup;

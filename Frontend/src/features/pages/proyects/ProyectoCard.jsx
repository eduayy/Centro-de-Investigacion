import React, { useState } from "react";
import "./ProyectoCard.css";

const ProyectoCard = ({ proyecto, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!proyecto) return null;

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="proyecto-card">
      <div className="proyecto-card-header" onClick={toggleCard}>
        <h3>{proyecto.nombreproyecto}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <div className="proyecto-card-body">
          <p>
            <strong>Descripción:</strong>{" "}
            {proyecto.descripcionproyecto || "No disponible"}
          </p>
          <p>
            <strong>Fecha de Inicio:</strong>{" "}
            {new Date(proyecto.fechainicio).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha de Término:</strong>{" "}
            {new Date(proyecto.fechatermino).toLocaleDateString()}
          </p>
          <div className="proyecto-card-actions">
            <button
              className="proyecto-btn-edit"
              onClick={() => onEdit(proyecto)}
            >
              Editar
            </button>
            <button
              className="proyecto-btn-delete"
              onClick={() => onDelete(proyecto.idproyecto)}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProyectoCard;

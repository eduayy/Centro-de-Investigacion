import React from "react";

const CareersForm = ({ title, carrera, onChange, onSubmit, onCancel }) => {
  return (
    <div className="form-container">
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nombre Carrera:</label>
          <input
            type="text"
            name="nombrecarrera"
            value={carrera.nombrecarrera}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Universidad:</label>
          <input
            type="text"
            name="nombreuniversidad"
            value={carrera.nombreuniversidad}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            {title.includes("Editar") ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareersForm;

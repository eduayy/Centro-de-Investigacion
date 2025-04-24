import React from "react";

const ResearchersForm = ({
  isEditing,
  formData,
  options,
  onChange,
  onCancel,
  onSubmit,
}) => (
  <div className="form-container">
    <h3>
      {isEditing ? "Editar Investigador" : "Registrar Nuevo Investigador"}
    </h3>
    <form onSubmit={onSubmit}>
      {["nombre", "email", "puesto"].map((field) => (
        <div className="form-group" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field]}
            onChange={onChange}
            required={field !== "puesto"}
          />
        </div>
      ))}

      <div className="form-group">
        <label>Nivel Educativo:</label>
        <select
          name="idniveledu"
          value={formData.idniveledu}
          onChange={onChange}
          required
        >
          <option value="">Seleccione un nivel</option>
          {options.nivelesEdu.map((n) => (
            <option key={n.idniveledu} value={n.idniveledu}>
              {n.nombrenivel}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Área:</label>
        <select
          name="idarea"
          value={formData.idarea}
          onChange={onChange}
          required
        >
          <option value="">Seleccione un área</option>
          {options.areas.map((a) => (
            <option key={a.idarea} value={a.idarea}>
              {a.nombrearea}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save">
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  </div>
);

export default ResearchersForm;

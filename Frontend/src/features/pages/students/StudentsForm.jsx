import React from "react";
import "./StudentsForm.css";

const StudentsForm = ({
  title,
  student,
  options,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="form-modal">
      <div className="form-header">
        <h3>{title}</h3>
        <button className="close-button" onClick={onCancel}>
          &times;
        </button>
      </div>

      <form onSubmit={onSubmit} className="student-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombreestudiante">Nombre</label>
            <input
              id="nombreestudiante"
              type="text"
              name="nombreestudiante"
              value={student.nombreestudiante || ""}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidoestudiante">Apellido</label>
            <input
              id="apellidoestudiante"
              type="text"
              name="apellidoestudiante"
              value={student.apellidoestudiante || ""}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="emailestudiante">Email</label>
          <input
            id="emailestudiante"
            type="email"
            name="emailestudiante"
            value={student.emailestudiante || ""}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idtipoestudiante">Tipo de Estudiante</label>
            <select
              id="idtipoestudiante"
              name="idtipoestudiante"
              value={student.idtipoestudiante || ""}
              onChange={onChange}
              required
            >
              <option value="">Seleccione...</option>
              {options.tiposEstudiante.map((tipo) => (
                <option
                  key={tipo.idtipoestudiante}
                  value={tipo.idtipoestudiante}
                >
                  {tipo.nombretipo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="idcarreras">Carrera</label>
            <select
              id="idcarreras"
              name="idcarreras"
              value={student.idcarreras || ""}
              onChange={onChange}
              required
              className="form-select"
            >
              <option value="">Seleccione una carrera</option>
              {options.carreras.map((carrera) => (
                <option key={carrera.idcarreras} value={carrera.idcarreras}>
                  {carrera.nombrecarrera}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Guardar
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentsForm;

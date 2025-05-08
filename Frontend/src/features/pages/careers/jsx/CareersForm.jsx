import React, { useState } from "react";
import "../style/CareersForm.css";

const CareersForm = ({
  title,
  carrera,
  onChange,
  onSubmit,
  onCancel,
  universidades = [],
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(e);

    if (value.length > 0) {
      const filtered = universidades.filter((uni) =>
        uni.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    const event = {
      target: {
        name: "nombreuniversidad",
        value: suggestion,
      },
    };
    onChange(event);
    setShowSuggestions(false);
  };

  return (
    <div className="form-modal">
      <div className="form-header">
        <h3>{title}</h3>
        <button className="close-button" onClick={onCancel}>
          &times;
        </button>
      </div>

      <form onSubmit={onSubmit} className="career-form">
        <div className="form-group">
          <label htmlFor="nombrecarrera">Nombre de la Carrera</label>
          <input
            id="nombrecarrera"
            type="text"
            name="nombrecarrera"
            value={carrera.nombrecarrera || ""}
            onChange={onChange}
            placeholder="Ingrese el nombre de la carrera"
            required
          />
        </div>

        <div className="form-group with-suggestions">
          <label htmlFor="nombreuniversidad">Universidad</label>
          <input
            id="nombreuniversidad"
            type="text"
            name="nombreuniversidad"
            value={carrera.nombreuniversidad || ""}
            onChange={handleInputChange}
            placeholder="Escriba o seleccione una universidad"
            required
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {title.includes("Editar") ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareersForm;

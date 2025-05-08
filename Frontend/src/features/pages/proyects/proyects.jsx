import React, { useEffect, useState } from "react";
import axios from "axios";
import "./proyects.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";
import ProyectoCard from "./ProyectoCard.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [investigadores, setInvestigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [selectedInvestigador, setSelectedInvestigador] = useState("");

  const initialProyectoState = {
    nombreproyecto: "",
    descripcionproyecto: "",
    fechainicio: "",
    fechatermino: "",
    idinvestigador: [],
  };

  const [newProyecto, setNewProyecto] = useState(initialProyectoState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proyectosRes, investigadoresRes] = await Promise.all([
          axios.get(`${API_BASE_URL}api/proyectos-api/`, {
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}api/investigadores-api/`, {
            withCredentials: true,
          }),
        ]);
        setProyectos(proyectosRes.data);
        setInvestigadores(investigadoresRes.data);
      } catch (error) {
        setError(
          `Error al cargar datos: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/proyectos-api/`,
        newProyecto,
        { withCredentials: true }
      );
      setProyectos([...proyectos, response.data]);
      setNewProyecto(initialProyectoState);
      setShowAddForm(false);
      setError(null);
    } catch (error) {
      setError(
        `Error al registrar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleAddInvestigador = () => {
    if (
      selectedInvestigador &&
      !newProyecto.idinvestigador.includes(selectedInvestigador)
    ) {
      setNewProyecto({
        ...newProyecto,
        idinvestigador: [...newProyecto.idinvestigador, selectedInvestigador],
      });
      setSelectedInvestigador("");
    }
  };

  const handleRemoveInvestigador = (idToRemove) => {
    setNewProyecto({
      ...newProyecto,
      idinvestigador: newProyecto.idinvestigador.filter(
        (id) => id !== idToRemove
      ),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProyecto({
      ...newProyecto,
      [name]: value,
    });
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setSelectedProyecto(null);
  };

  const handleSelectProyecto = (proyecto) => {
    setSelectedProyecto(proyecto);
    setShowAddForm(false);
  };

  const handleCloseCard = () => {
    setSelectedProyecto(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setNewProyecto(initialProyectoState);
  };

  if (loading) return <div className="loading">Cargando proyectos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="proyectos-page-container">
      <Sidebar />
      <div className="proyectos-main-content">
        <h2 className="proyectos-title">Proyectos</h2>
        <button className="proyectos-btn-add" onClick={handleShowAddForm}>
          + Nuevo Proyecto
        </button>

        <div className="proyectos-table-container">
          <table className="proyectos-data-table">
            <thead className="proyectos-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody className="proyectos-table-body">
              {proyectos.map((proyecto) => (
                <tr
                  key={proyecto.idproyecto}
                  className="proyectos-table-row"
                  onClick={() => handleSelectProyecto(proyecto)}
                >
                  <td>{proyecto.idproyecto}</td>
                  <td>{proyecto.nombreproyecto}</td>
                  <td>{proyecto.descripcionproyecto || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedProyecto && (
          <ProyectoCard proyecto={selectedProyecto} onClose={handleCloseCard} />
        )}

        {showAddForm && (
          <div className="proyectos-form-container">
            <h3 className="proyectos-form-title">Registrar Nuevo Proyecto</h3>
            <form onSubmit={handleAdd} className="proyectos-form">
              <div className="proyectos-form-group">
                <label className="proyectos-form-label">
                  Nombre del Proyecto:
                </label>
                <input
                  type="text"
                  name="nombreproyecto"
                  className="proyectos-form-input"
                  value={newProyecto.nombreproyecto}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="proyectos-form-group">
                <label className="proyectos-form-label">Descripción:</label>
                <textarea
                  name="descripcionproyecto"
                  className="proyectos-form-textarea"
                  value={newProyecto.descripcionproyecto}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="proyectos-form-row">
                <div className="proyectos-form-group">
                  <label className="proyectos-form-label">
                    Fecha de Inicio:
                  </label>
                  <input
                    type="date"
                    name="fechainicio"
                    className="proyectos-form-input"
                    value={newProyecto.fechainicio}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="proyectos-form-group">
                  <label className="proyectos-form-label">
                    Fecha de Término:
                  </label>
                  <input
                    type="date"
                    name="fechatermino"
                    className="proyectos-form-input"
                    value={newProyecto.fechatermino}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="proyectos-form-group">
                <label className="proyectos-form-label">Investigadores:</label>
                <div className="investigadores-select-container">
                  <select
                    className="proyectos-form-select"
                    value={selectedInvestigador}
                    onChange={(e) => setSelectedInvestigador(e.target.value)}
                  >
                    <option value="">Seleccionar investigador</option>
                    {investigadores.map((investigador) => (
                      <option
                        key={investigador.idinvestigador}
                        value={investigador.idinvestigador}
                      >
                        {investigador.nombre} {investigador.apellido}
                      </option>
                    ))}
                  </select>
                  {/*
                  <button
                    type="button"
                    className="proyectos-btn-add-investigador"
                    onClick={handleAddInvestigador}
                    disabled={!selectedInvestigador}
                  >
                    Añadir
                  </button> */}
                </div>

                <div className="investigadores-list">
                  {newProyecto.idinvestigador.map((id) => {
                    const investigador = investigadores.find(
                      (i) => i.idinvestigador === id
                    );
                    return investigador ? (
                      <div key={id} className="investigador-tag">
                        {investigador.nombre} {investigador.apellido}
                        <button
                          type="button"
                          className="investigador-remove-btn"
                          onClick={() => handleRemoveInvestigador(id)}
                        >
                          ×
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="proyectos-form-actions">
                <button type="submit" className="proyectos-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="proyectos-btn-cancel"
                  onClick={handleCloseForm}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proyectos;

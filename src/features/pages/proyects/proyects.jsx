import React, { useEffect, useState } from "react";
import axios from "axios";
import "./proyects.css";
import Sidebar from "../../../components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialProyectoState = {
    nombreproyecto: "",
    descripcionproyecto: "",
    fechainicio: "",
    fechatermino: "",
  };

  const [newProyecto, setNewProyecto] = useState(initialProyectoState);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/proyectos-api/`, {
          withCredentials: true,
        });
        setProyectos(response.data);
      } catch (error) {
        setError(
          `Error al cargar proyectos: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/proyectos-api/${editingProyecto.idproyecto}/`,
        editingProyecto,
        { withCredentials: true }
      );
      setProyectos(
        proyectos.map((p) =>
          p.idproyecto === editingProyecto.idproyecto ? response.data : p
        )
      );
      setEditingProyecto(null);
      setError(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/proyectos-api/${id}/`, {
        withCredentials: true,
      });
      setProyectos(proyectos.filter((p) => p.idproyecto !== id));
      setError(null);
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProyecto({
        ...editingProyecto,
        [name]: value,
      });
    } else {
      setNewProyecto({
        ...newProyecto,
        [name]: value,
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  if (loading) return <div className="loading">Cargando proyectos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="proyectos-page-container">
      <Sidebar />
      <div className="proyectos-main-content">
        <h2 className="proyectos-title">Proyectos</h2>

        <button
          className="proyectos-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nuevo Proyecto
        </button>

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

              <div className="proyectos-form-actions">
                <button type="submit" className="proyectos-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="proyectos-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editingProyecto && (
          <div className="proyectos-form-container">
            <h3 className="proyectos-form-title">Editar Proyecto</h3>
            <form onSubmit={handleUpdate} className="proyectos-form">
              {/* Campos similares al formulario de agregar */}
              {/* ... */}
            </form>
          </div>
        )}

        <div className="proyectos-table-container">
          <table className="proyectos-data-table">
            <thead className="proyectos-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Inicio</th>
                <th>Término</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="proyectos-table-body">
              {proyectos.map((proyecto) => (
                <tr key={proyecto.idproyecto} className="proyectos-table-row">
                  <td>{proyecto.idproyecto}</td>
                  <td>{proyecto.nombreproyecto}</td>
                  <td>{proyecto.descripcionproyecto || "-"}</td>
                  <td>{formatDate(proyecto.fechainicio)}</td>
                  <td>{formatDate(proyecto.fechatermino)}</td>
                  <td className="proyectos-actions-cell">
                    <button
                      className="proyectos-btn-edit"
                      onClick={() => setEditingProyecto(proyecto)}
                    >
                      Editar
                    </button>
                    <button
                      className="proyectos-btn-delete"
                      onClick={() => handleDelete(proyecto.idproyecto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;

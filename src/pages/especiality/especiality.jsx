import React, { useEffect, useState } from "react";
import axios from "axios";
import "./especiality.css";
import Sidebar from "../sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEspecialidad, setEditingEspecialidad] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialEspecialidadState = {
    descripcion: "",
    estatus: true,
  };

  const [newEspecialidad, setNewEspecialidad] = useState(
    initialEspecialidadState
  );

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}api/especialidades-api/`,
          { withCredentials: true }
        );
        setEspecialidades(response.data);
      } catch (error) {
        setError(
          `Error al cargar especialidades: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/especialidades-api/`,
        newEspecialidad,
        { withCredentials: true }
      );
      setEspecialidades([...especialidades, response.data]);
      setNewEspecialidad(initialEspecialidadState);
      setShowAddForm(false);
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
        `${API_BASE_URL}api/especialidades-api/${editingEspecialidad.idespecialidades}/`,
        editingEspecialidad,
        { withCredentials: true }
      );
      setEspecialidades(
        especialidades.map((e) =>
          e.idespecialidades === editingEspecialidad.idespecialidades
            ? response.data
            : e
        )
      );
      setEditingEspecialidad(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta especialidad?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/especialidades-api/${id}/`, {
        withCredentials: true,
      });
      setEspecialidades(
        especialidades.filter((e) => e.idespecialidades !== id)
      );
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (isEditing) {
      setEditingEspecialidad({
        ...editingEspecialidad,
        [name]: val,
      });
    } else {
      setNewEspecialidad({
        ...newEspecialidad,
        [name]: val,
      });
    }
  };

  if (loading)
    return (
      <div className="especialidades-loading">Cargando especialidades...</div>
    );
  if (error) return <div className="especialidades-error-message">{error}</div>;

  return (
    <div className="especialidades-page-container">
      <Sidebar />
      <div className="especialidades-main-content">
        <h2 className="especialidades-title">Especialidades</h2>

        <button
          className="especialidades-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nueva Especialidad
        </button>

        {showAddForm && (
          <div className="especialidades-form-container">
            <h3 className="especialidades-form-title">
              Registrar Nueva Especialidad
            </h3>
            <form onSubmit={handleAdd} className="especialidades-form">
              <div className="especialidades-form-group">
                <label className="especialidades-form-label">
                  Descripción:
                </label>
                <input
                  type="text"
                  name="descripcion"
                  className="especialidades-form-input"
                  value={newEspecialidad.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="especialidades-form-group especialidades-checkbox-group">
                <label className="especialidades-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="especialidades-form-checkbox"
                  checked={newEspecialidad.estatus}
                  onChange={handleInputChange}
                />
              </div>

              <div className="especialidades-form-actions">
                <button type="submit" className="especialidades-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="especialidades-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editingEspecialidad && (
          <div className="especialidades-form-container">
            <h3 className="especialidades-form-title">Editar Especialidad</h3>
            <form onSubmit={handleUpdate} className="especialidades-form">
              <div className="especialidades-form-group">
                <label className="especialidades-form-label">
                  Descripción:
                </label>
                <input
                  type="text"
                  name="descripcion"
                  className="especialidades-form-input"
                  value={editingEspecialidad.descripcion}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="especialidades-form-group especialidades-checkbox-group">
                <label className="especialidades-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="especialidades-form-checkbox"
                  checked={editingEspecialidad.estatus}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="especialidades-form-actions">
                <button type="submit" className="especialidades-btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="especialidades-btn-cancel"
                  onClick={() => setEditingEspecialidad(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="especialidades-table-container">
          <table className="especialidades-data-table">
            <thead className="especialidades-table-header">
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="especialidades-table-body">
              {especialidades.map((especialidad) => (
                <tr
                  key={especialidad.idespecialidades}
                  className="especialidades-table-row"
                >
                  <td>{especialidad.idespecialidades}</td>
                  <td>{especialidad.descripcion}</td>
                  <td>{especialidad.estatus ? "Activo" : "Inactivo"}</td>
                  <td className="especialidades-actions-cell">
                    <button
                      className="especialidades-btn-edit"
                      onClick={() => setEditingEspecialidad(especialidad)}
                    >
                      Editar
                    </button>
                    <button
                      className="especialidades-btn-delete"
                      onClick={() =>
                        handleDelete(especialidad.idespecialidades)
                      }
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

export default Especialidades;

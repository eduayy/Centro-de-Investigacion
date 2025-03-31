import React, { useEffect, useState } from "react";
import axios from "axios";
import "./areas.css";
import Sidebar from "../sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArea, setEditingArea] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialAreaState = {
    nombrearea: "",
    descripcionarea: "",
    estatus: true,
    idunidades: "",
  };

  const [newArea, setNewArea] = useState(initialAreaState);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [areasRes, unidadesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}api/areas-api/`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}api/unidades-api/`, {
            withCredentials: true,
          }),
        ]);

        setAreas(areasRes.data);
        setUnidades(unidadesRes.data);
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

    fetchInitialData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/areas-api/`,
        newArea,
        { withCredentials: true }
      );
      setAreas([...areas, response.data]);
      setNewArea(initialAreaState);
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
        `${API_BASE_URL}api/areas-api/${editingArea.idarea}/`,
        editingArea,
        { withCredentials: true }
      );
      setAreas(
        areas.map((a) => (a.idarea === editingArea.idarea ? response.data : a))
      );
      setEditingArea(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta área?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/areas-api/${id}/`, {
        withCredentials: true,
      });
      setAreas(areas.filter((a) => a.idarea !== id));
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
      setEditingArea({
        ...editingArea,
        [name]: val,
      });
    } else {
      setNewArea({
        ...newArea,
        [name]: val,
      });
    }
  };

  const getUnidadName = (id) => {
    const unidad = unidades.find((u) => u.idunidades === id);
    return unidad ? unidad.nombreunidad : "No asignada";
  };

  if (loading) return <div className="areas-loading">Cargando áreas...</div>;
  if (error) return <div className="areas-error-message">{error}</div>;

  return (
    <div className="areas-page-container">
      <Sidebar />
      <div className="areas-main-content">
        <h2 className="areas-title">Gestión de Áreas</h2>

        <button className="areas-btn-add" onClick={() => setShowAddForm(true)}>
          + Nueva Área
        </button>

        {showAddForm && (
          <div className="areas-form-container">
            <h3 className="areas-form-title">Registrar Nueva Área</h3>
            <form onSubmit={handleAdd} className="areas-form">
              <div className="areas-form-group">
                <label className="areas-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombrearea"
                  className="areas-form-input"
                  value={newArea.nombrearea}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="areas-form-group">
                <label className="areas-form-label">Descripción:</label>
                <input
                  type="text"
                  name="descripcionarea"
                  className="areas-form-input"
                  value={newArea.descripcionarea}
                  onChange={handleInputChange}
                />
              </div>

              <div className="areas-form-group">
                <label className="areas-form-label">Unidad:</label>
                <select
                  name="idunidades"
                  className="areas-form-select"
                  value={newArea.idunidades}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una unidad</option>
                  {unidades.map((unidad) => (
                    <option key={unidad.idunidades} value={unidad.idunidades}>
                      {unidad.nombreunidad}
                    </option>
                  ))}
                </select>
              </div>

              <div className="areas-form-group areas-checkbox-group">
                <label className="areas-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="areas-form-checkbox"
                  checked={newArea.estatus}
                  onChange={handleInputChange}
                />
              </div>

              <div className="areas-form-actions">
                <button type="submit" className="areas-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="areas-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editingArea && (
          <div className="areas-form-container">
            <h3 className="areas-form-title">Editar Área</h3>
            <form onSubmit={handleUpdate} className="areas-form">
              <div className="areas-form-group">
                <label className="areas-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombrearea"
                  className="areas-form-input"
                  value={editingArea.nombrearea}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="areas-form-group">
                <label className="areas-form-label">Descripción:</label>
                <input
                  type="text"
                  name="descripcionarea"
                  className="areas-form-input"
                  value={editingArea.descripcionarea}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="areas-form-group">
                <label className="areas-form-label">Unidad:</label>
                <select
                  name="idunidades"
                  className="areas-form-select"
                  value={editingArea.idunidades}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                >
                  <option value="">Seleccione una unidad</option>
                  {unidades.map((unidad) => (
                    <option key={unidad.idunidades} value={unidad.idunidades}>
                      {unidad.nombreunidad}
                    </option>
                  ))}
                </select>
              </div>

              <div className="areas-form-group areas-checkbox-group">
                <label className="areas-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="areas-form-checkbox"
                  checked={editingArea.estatus}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="areas-form-actions">
                <button type="submit" className="areas-btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="areas-btn-cancel"
                  onClick={() => setEditingArea(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="areas-table-container">
          <table className="areas-data-table">
            <thead className="areas-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Unidad</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="areas-table-body">
              {areas.map((area) => (
                <tr key={area.idarea} className="areas-table-row">
                  <td>{area.idarea}</td>
                  <td>{area.nombrearea}</td>
                  <td>{area.descripcionarea || "-"}</td>
                  <td>{getUnidadName(area.idunidades)}</td>
                  <td>{area.estatus ? "Activo" : "Inactivo"}</td>
                  <td className="areas-actions-cell">
                    <button
                      className="areas-btn-edit"
                      onClick={() => setEditingArea(area)}
                    >
                      Editar
                    </button>
                    <button
                      className="areas-btn-delete"
                      onClick={() => handleDelete(area.idarea)}
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

export default Areas;

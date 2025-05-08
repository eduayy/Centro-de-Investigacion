import React, { useEffect, useState } from "react";
import axios from "axios";
import "./areas.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

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
        <div className="areas-header">
          <h2 className="areas-title">Gestión de Áreas</h2>
          <p className="areas-subtitle">Gestiona todas las áreas del sistema</p>
        </div>

        <button className="areas-btn-add" onClick={() => setShowAddForm(true)}>
          + Nueva Área
        </button>

        {/* Modal para agregar nueva área */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3 className="modal-title">Registrar Nueva Área</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  &times;
                </button>
              </div>
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
                  <textarea
                    name="descripcionarea"
                    className="areas-form-textarea"
                    value={newArea.descripcionarea}
                    onChange={handleInputChange}
                    rows="3"
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
                  <input
                    type="checkbox"
                    name="estatus"
                    className="areas-form-checkbox"
                    checked={newArea.estatus}
                    onChange={handleInputChange}
                    id="estatus-checkbox"
                  />
                  <label
                    htmlFor="estatus-checkbox"
                    className="areas-form-label"
                  >
                    Estatus Activo
                  </label>
                </div>

                <div className="modal-footer">
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
          </div>
        )}

        {/* Modal para editar área */}
        {editingArea && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3 className="modal-title">Editar Área</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setEditingArea(null)}
                >
                  &times;
                </button>
              </div>
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
                  <textarea
                    name="descripcionarea"
                    className="areas-form-textarea"
                    value={editingArea.descripcionarea}
                    onChange={(e) => handleInputChange(e, true)}
                    rows="3"
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
                  <input
                    type="checkbox"
                    name="estatus"
                    className="areas-form-checkbox"
                    checked={editingArea.estatus}
                    onChange={(e) => handleInputChange(e, true)}
                    id="edit-estatus-checkbox"
                  />
                  <label
                    htmlFor="edit-estatus-checkbox"
                    className="areas-form-label"
                  >
                    Estatus Activo
                  </label>
                </div>

                <div className="modal-footer">
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
              </tr>
            </thead>
            <tbody className="areas-table-body">
              {areas.map((area) => (
                <tr key={area.idarea} className="areas-table-row">
                  <td>{area.idarea}</td>
                  <td>{area.nombrearea}</td>
                  <td>{area.descripcionarea || "-"}</td>
                  <td>{getUnidadName(area.idunidades)}</td>
                  <td>
                    <span
                      className={`area-status ${
                        area.estatus ? "active" : "inactive"
                      }`}
                    >
                      {area.estatus ? "Activo" : "Inactivo"}
                    </span>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./investigation.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Lineas = () => {
  const [lineas, setLineas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLinea, setEditingLinea] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialLineaState = {
    nombre: "",
    descripcion: "",
    fechaapertura: "",
    estatus: true,
  };

  const [newLinea, setNewLinea] = useState(initialLineaState);

  useEffect(() => {
    const fetchLineas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/lineas-api/`, {
          withCredentials: true,
        });
        setLineas(response.data);
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

    fetchLineas();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/lineas-api/`,
        newLinea,
        { withCredentials: true }
      );
      setLineas([...lineas, response.data]);
      setNewLinea(initialLineaState);
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
        `${API_BASE_URL}api/lineas-api/${editingLinea.idlineas}/`,
        editingLinea,
        { withCredentials: true }
      );
      setLineas(
        lineas.map((l) =>
          l.idlineas === editingLinea.idlineas ? response.data : l
        )
      );
      setEditingLinea(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta línea?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/lineas-api/${id}/`, {
        withCredentials: true,
      });
      setLineas(lineas.filter((l) => l.idlineas !== id));
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
      setEditingLinea({
        ...editingLinea,
        [name]: val,
      });
    } else {
      setNewLinea({
        ...newLinea,
        [name]: val,
      });
    }
  };

  if (loading) return <div className="lineas-loading">Cargando líneas...</div>;
  if (error) return <div className="lineas-error-message">{error}</div>;

  return (
    <div className="lineas-page-container">
      <Sidebar />
      <div className="lineas-main-content">
        <h2 className="lineas-title">Líneas de Investigación</h2>

        <button className="lineas-btn-add" onClick={() => setShowAddForm(true)}>
          + Nueva Línea
        </button>

        {showAddForm && (
          <div className="lineas-form-container">
            <h3 className="lineas-form-title">Registrar Nueva Línea</h3>
            <form onSubmit={handleAdd} className="lineas-form">
              <div className="lineas-form-group">
                <label className="lineas-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="lineas-form-input"
                  value={newLinea.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="lineas-form-group">
                <label className="lineas-form-label">Descripción:</label>
                <input
                  type="text"
                  name="descripcion"
                  className="lineas-form-input"
                  value={newLinea.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lineas-form-group">
                <label className="lineas-form-label">Fecha de Apertura:</label>
                <input
                  type="date"
                  name="fechaapertura"
                  className="lineas-form-input"
                  value={newLinea.fechaapertura}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="lineas-form-group lineas-checkbox-group">
                <label className="lineas-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="lineas-form-checkbox"
                  checked={newLinea.estatus}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lineas-form-actions">
                <button type="submit" className="lineas-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="lineas-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editingLinea && (
          <div className="lineas-form-container">
            <h3 className="lineas-form-title">Editar Línea</h3>
            <form onSubmit={handleUpdate} className="lineas-form">
              <div className="lineas-form-group">
                <label className="lineas-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="lineas-form-input"
                  value={editingLinea.nombre}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="lineas-form-group">
                <label className="lineas-form-label">Descripción:</label>
                <input
                  type="text"
                  name="descripcion"
                  className="lineas-form-input"
                  value={editingLinea.descripcion}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="lineas-form-group">
                <label className="lineas-form-label">Fecha de Apertura:</label>
                <input
                  type="date"
                  name="fechaapertura"
                  className="lineas-form-input"
                  value={editingLinea.fechaapertura}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="lineas-form-group lineas-checkbox-group">
                <label className="lineas-form-label">Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  className="lineas-form-checkbox"
                  checked={editingLinea.estatus}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="lineas-form-actions">
                <button type="submit" className="lineas-btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="lineas-btn-cancel"
                  onClick={() => setEditingLinea(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="lineas-table-container">
          <table className="lineas-data-table">
            <thead className="lineas-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha de Apertura</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="lineas-table-body">
              {lineas.map((linea) => (
                <tr key={linea.idlineas} className="lineas-table-row">
                  <td>{linea.idlineas}</td>
                  <td>{linea.nombre}</td>
                  <td>{linea.descripcion || "-"}</td>
                  <td>{linea.fechaapertura}</td>
                  <td>{linea.estatus ? "Activo" : "Inactivo"}</td>
                  <td className="lineas-actions-cell">
                    <button
                      className="lineas-btn-edit"
                      onClick={() => setEditingLinea(linea)}
                    >
                      Editar
                    </button>
                    <button
                      className="lineas-btn-delete"
                      onClick={() => handleDelete(linea.idlineas)}
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

export default Lineas;

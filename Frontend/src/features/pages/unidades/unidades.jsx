import React, { useEffect, useState } from "react";
import axios from "axios";
import "./unidades.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUnidad, setEditingUnidad] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialUnidadState = {
    nombre: "",
  };

  const [newUnidad, setNewUnidad] = useState(initialUnidadState);

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/unidades-api/`, {
          withCredentials: true,
        });
        setUnidades(response.data);
      } catch (error) {
        setError(
          `Error al cargar unidades: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUnidades();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/unidades-api/`,
        newUnidad,
        { withCredentials: true }
      );
      setUnidades([...unidades, response.data]);
      setNewUnidad(initialUnidadState);
      setShowAddForm(false);
    } catch (error) {
      setError(
        `Error al registrar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta unidad?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/unidades-api/${id}/`, {
        withCredentials: true,
      });
      setUnidades(unidades.filter((u) => u.idunidades !== id));
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnidad({
      ...newUnidad,
      [name]: value,
    });
  };

  if (loading)
    return <div className="unidades-loading">Cargando unidades...</div>;
  if (error) return <div className="unidades-error-message">{error}</div>;

  return (
    <div className="unidades-page-container">
      <Sidebar />
      <div className="unidades-main-content">
        <div className="unidades-header">
          <h2 className="unidades-title">Gestión de Unidades</h2>
          <p className="unidades-subtitle">
            Administra las unidades del sistema
          </p>
        </div>

        <button
          className="unidades-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nueva Unidad
        </button>
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3 className="modal-title">Registrar Nueva Unidad</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAdd} className="unidades-form">
                <div className="unidades-form-group">
                  <label className="unidades-form-label">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    className="unidades-form-input"
                    value={newUnidad.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="submit" className="unidades-btn-save">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="unidades-btn-cancel"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="unidades-table-container">
          <table className="unidades-data-table">
            <thead className="unidades-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody className="unidades-table-body">
              {unidades.map((unidad) => (
                <tr key={unidad.idunidades} className="unidades-table-row">
                  <td>{unidad.idunidades}</td>
                  <td>{unidad.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Unidades;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tools.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Herramientas = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingHerramienta, setEditingHerramienta] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const initialHerramientaState = {
    nombreherramienta: "",
    tipoherramienta: "",
  };

  const [newHerramienta, setNewHerramienta] = useState(initialHerramientaState);

  useEffect(() => {
    const fetchHerramientas = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}api/herramientas-api/`,
          {
            withCredentials: true,
          }
        );
        setHerramientas(response.data);
      } catch (error) {
        setError(
          `Error al cargar herramientas: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHerramientas();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/herramientas-api/`,
        newHerramienta,
        { withCredentials: true }
      );
      setHerramientas([...herramientas, response.data]);
      setNewHerramienta(initialHerramientaState);
      setShowAddForm(false);
    } catch (error) {
      setError(
        `Error al registrar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  /* const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/herramientas-api/${editingHerramienta.idherramientas}/`,
        editingHerramienta,
        { withCredentials: true }
      );
      setHerramientas(
        herramientas.map((h) =>
          h.idherramientas === editingHerramienta.idherramientas
            ? response.data
            : h
        )
      );
      setEditingHerramienta(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  }; */

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta herramienta?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/herramientas-api/${id}/`, {
        withCredentials: true,
      });
      setHerramientas(herramientas.filter((h) => h.idherramientas !== id));
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditingHerramienta({
        ...editingHerramienta,
        [name]: value,
      });
    } else {
      setNewHerramienta({
        ...newHerramienta,
        [name]: value,
      });
    }
  };

  if (loading)
    return <div className="herramientas-loading">Cargando herramientas...</div>;
  if (error) return <div className="herramientas-error-message">{error}</div>;

  return (
    <div className="herramientas-page-container">
      <Sidebar />
      <div className="herramientas-main-content">
        <h2 className="herramientas-title">Herramientas</h2>

        <button
          className="herramientas-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nueva Herramienta
        </button>

        {showAddForm && (
          <div className="herramientas-form-container">
            <h3 className="herramientas-form-title">
              Registrar Nueva Herramienta
            </h3>
            <form onSubmit={handleAdd} className="herramientas-form">
              <div className="herramientas-form-group">
                <label className="herramientas-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombreherramienta"
                  className="herramientas-form-input"
                  value={newHerramienta.nombreherramienta}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="herramientas-form-group">
                <label className="herramientas-form-label">
                  Tipo de Herramienta:
                </label>
                <input
                  type="text"
                  name="tipoherramienta"
                  className="herramientas-form-input"
                  value={newHerramienta.tipoherramienta}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="herramientas-form-actions">
                <button type="submit" className="herramientas-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="herramientas-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="herramientas-table-container">
          <table className="herramientas-data-table">
            <thead className="herramientas-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo de Herramienta</th>
              </tr>
            </thead>
            <tbody className="herramientas-table-body">
              {herramientas.map((herramienta) => (
                <tr
                  key={herramienta.idherramientas}
                  className="herramientas-table-row"
                >
                  <td>{herramienta.idherramientas}</td>
                  <td>{herramienta.nombreherramienta}</td>
                  <td>{herramienta.tipoherramienta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Herramientas;

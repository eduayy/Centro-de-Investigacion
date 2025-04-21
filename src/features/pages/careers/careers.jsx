import React, { useEffect, useState } from "react";
import axios from "axios";
import "./careers.css";
import Sidebar from "../../../components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Careers = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCarrera, setEditingCarrera] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialCarreraState = {
    nombrecarrera: "",
    nombreuniversidad: "",
  };

  const [newCarrera, setNewCarrera] = useState(initialCarreraState);

  // Load data from API
  useEffect(() => {
    const fetchCarrerasData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/carreras-api/`, {
          withCredentials: true,
        });
        setCarreras(response.data || []);
      } catch (error) {
        setError(
          `Error al cargar carreras: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCarrerasData();
  }, []);

  // Create new careers, show form, and added to the list
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/carreras-api/`,
        newCarrera,
        { withCredentials: true }
      );
      setCarreras([...carreras, response.data]);
      setNewCarrera(initialCarreraState);
      setShowAddForm(false);
      setError(null);
    } catch (error) {
      setError(
        `Error al crear: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Function to update careers in edit mode
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/carreras-api/${editingCarrera.idcarreras}/`,
        editingCarrera,
        { withCredentials: true }
      );
      setCarreras(
        carreras.map((c) =>
          c.idcarreras === editingCarrera.idcarreras ? response.data : c
        )
      );
      setEditingCarrera(null);
      setError(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Function to handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta carrera?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/carreras-api/${id}/`, {
        withCredentials: true,
      });
      setCarreras(carreras.filter((c) => c.idcarreras !== id));
      setError(null);
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Handle input changes for both add and edit forms
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingCarrera({
        ...editingCarrera,
        [name]: value,
      });
    } else {
      setNewCarrera({
        ...newCarrera,
        [name]: value,
      });
    }
  };

  if (loading) return <div className="loading">Cargando carreras...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="carreras-page">
      <Sidebar />
      <div className="carreras-content">
        <h2>Listado de carreras 📕</h2>

        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Nueva Carrera
        </button>

        {showAddForm && (
          <div className="form-container">
            <h3>Nueva Carrera</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Nombre Carrera:</label>
                <input
                  type="text"
                  name="nombrecarrera"
                  value={newCarrera.nombrecarrera}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Universidad:</label>
                <input
                  type="text"
                  name="nombreuniversidad"
                  value={newCarrera.nombreuniversidad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editingCarrera && (
          <div className="form-container">
            <h3>Editar Carrera</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Nombre Carrera:</label>
                <input
                  type="text"
                  name="nombrecarrera"
                  value={editingCarrera.nombrecarrera}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Universidad:</label>
                <input
                  type="text"
                  name="nombreuniversidad"
                  value={editingCarrera.nombreuniversidad}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditingCarrera(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-container">
          <table className="carreras-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Carrera</th>
                <th>Universidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map((carrera) => (
                <tr key={carrera.idcarreras}>
                  <td>{carrera.idcarreras}</td>
                  <td>{carrera.nombrecarrera}</td>
                  <td>{carrera.nombreuniversidad}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditingCarrera(carrera)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(carrera.idcarreras)}
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

export default Careers;

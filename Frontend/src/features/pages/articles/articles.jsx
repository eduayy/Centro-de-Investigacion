import React, { useEffect, useState } from "react";
import axios from "axios";
import "./articles.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticulo, setEditingArticulo] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const initialArticuloState = {
    nombre: "",
    revista: "",
    pais: "",
    aniopublicacion: "",
    url: "",
    doi: "",
  };

  const [newArticulo, setNewArticulo] = useState(initialArticuloState);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/articulos-api/`, {
          withCredentials: true,
        });
        setArticulos(response.data);
      } catch (error) {
        setError(
          `Error al cargar artículos: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticulos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/articulos-api/`,
        newArticulo,
        { withCredentials: true }
      );
      setArticulos([...articulos, response.data]);
      setNewArticulo(initialArticuloState);
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
        `${API_BASE_URL}api/articulos-api/${editingArticulo.idarticulo}/`,
        editingArticulo,
        { withCredentials: true }
      );
      setArticulos(
        articulos.map((a) =>
          a.idarticulo === editingArticulo.idarticulo ? response.data : a
        )
      );
      setEditingArticulo(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este artículo?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/articulos-api/${id}/`, {
        withCredentials: true,
      });
      setArticulos(articulos.filter((a) => a.idarticulo !== id));
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditingArticulo({
        ...editingArticulo,
        [name]: value,
      });
    } else {
      setNewArticulo({
        ...newArticulo,
        [name]: value,
      });
    }
  };

  if (loading)
    return <div className="articulos-loading">Cargando artículos...</div>;
  if (error) return <div className="articulos-error-message">{error}</div>;

  return (
    <div className="articulos-page-container">
      <Sidebar />
      <div className="articulos-main-content">
        <h2 className="articulos-title">Gestión de Artículos</h2>

        <button
          className="articulos-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nuevo Artículo
        </button>

        {showAddForm && (
          <div className="articulos-form-container">
            <h3 className="articulos-form-title">Registrar Nuevo Artículo</h3>
            <form onSubmit={handleAdd} className="articulos-form">
              <div className="articulos-form-group">
                <label className="articulos-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="articulos-form-input"
                  value={newArticulo.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="articulos-form-group">
                <label className="articulos-form-label">Revista:</label>
                <input
                  type="text"
                  name="revista"
                  className="articulos-form-input"
                  value={newArticulo.revista}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="articulos-form-group">
                <label className="articulos-form-label">País:</label>
                <input
                  type="text"
                  name="pais"
                  className="articulos-form-input"
                  value={newArticulo.pais}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="articulos-form-group">
                <label className="articulos-form-label">
                  Año de Publicación:
                </label>
                <input
                  type="date"
                  name="aniopublicacion"
                  className="articulos-form-input"
                  value={newArticulo.aniopublicacion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="articulos-form-group">
                <label className="articulos-form-label">URL:</label>
                <input
                  type="text"
                  name="url"
                  className="articulos-form-input"
                  value={newArticulo.url}
                  onChange={handleInputChange}
                />
              </div>

              <div className="articulos-form-group">
                <label className="articulos-form-label">DOI:</label>
                <input
                  type="text"
                  name="doi"
                  className="articulos-form-input"
                  value={newArticulo.doi}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="articulos-form-actions">
                <button type="submit" className="articulos-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="articulos-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="articulos-table-container">
          <table className="articulos-data-table">
            <thead className="articulos-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Revista</th>
                <th>País</th>
                <th>Año</th>
                <th>DOI</th>
              </tr>
            </thead>
            <tbody className="articulos-table-body">
              {articulos.map((articulo) => (
                <tr key={articulo.idarticulo} className="articulos-table-row">
                  <td>{articulo.idarticulo}</td>
                  <td>{articulo.nombre}</td>
                  <td>{articulo.revista}</td>
                  <td>{articulo.pais}</td>
                  <td>{articulo.aniopublicacion}</td>
                  <td>{articulo.doi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Articulos;

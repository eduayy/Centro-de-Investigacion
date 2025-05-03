import React, { useEffect, useState } from "react";
import axios from "axios";
import "./events.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvento, setEditingEvento] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tipoEventos, setTipoEventos] = useState([]);

  const initialEventoState = {
    nombreevento: "",
    lugarevento: "",
    fechaevento: "",
    duracionevento: "",
    empresainvitante: "",
    idtipoevento: "",
  };

  const [newEvento, setNewEvento] = useState(initialEventoState);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/eventos-api/`, {
          withCredentials: true,
        });
        setEventos(response.data);
      } catch (error) {
        setError(
          `Error al cargar eventos: ${
            error.response?.data?.detail || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchTipoEventos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/eventos-api/`, {
          withCredentials: true,
        });
        setTipoEventos(response.data);
      } catch (error) {
        setError(
          `Error al cargar tipos de evento: ${
            error.response?.data?.detail || error.message
          }`
        );
      }
    };

    fetchEventos();
    fetchTipoEventos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/eventos-api/`,
        newEvento,
        { withCredentials: true }
      );
      setEventos([...eventos, response.data]);
      setNewEvento(initialEventoState);
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
        `${API_BASE_URL}api/eventos-api/${editingEvento.idevento}/`,
        editingEvento,
        { withCredentials: true }
      );
      setEventos(
        eventos.map((e) =>
          e.idevento === editingEvento.idevento ? response.data : e
        )
      );
      setEditingEvento(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/eventos-api/${id}/`, {
        withCredentials: true,
      });
      setEventos(eventos.filter((e) => e.idevento !== id));
    } catch (error) {
      setError(
        `Error al eliminar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditingEvento({
        ...editingEvento,
        [name]: value,
      });
    } else {
      setNewEvento({
        ...newEvento,
        [name]: value,
      });
    }
  };

  if (loading)
    return <div className="eventos-loading">Cargando eventos...</div>;
  if (error) return <div className="eventos-error-message">{error}</div>;

  return (
    <div className="eventos-page-container">
      <Sidebar />
      <div className="eventos-main-content">
        <h2 className="eventos-title">Eventos</h2>

        <button
          className="eventos-btn-add"
          onClick={() => setShowAddForm(true)}
        >
          + Nuevo Evento
        </button>

        {showAddForm && (
          <div className="eventos-form-container">
            <h3 className="eventos-form-title">Registrar Nuevo Evento</h3>
            <form onSubmit={handleAdd} className="eventos-form">
              <div className="eventos-form-group">
                <label className="eventos-form-label">Nombre:</label>
                <input
                  type="text"
                  name="nombreevento"
                  className="eventos-form-input"
                  value={newEvento.nombreevento}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="eventos-form-group">
                <label className="eventos-form-label">Lugar:</label>
                <input
                  type="text"
                  name="lugarevento"
                  className="eventos-form-input"
                  value={newEvento.lugarevento}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="eventos-form-group">
                <label className="eventos-form-label">Fecha:</label>
                <input
                  type="date"
                  name="fechaevento"
                  className="eventos-form-input"
                  value={newEvento.fechaevento}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="eventos-form-group">
                <label className="eventos-form-label">Duración:</label>
                <input
                  type="text"
                  name="duracionevento"
                  className="eventos-form-input"
                  value={newEvento.duracionevento}
                  onChange={handleInputChange}
                />
              </div>

              <div className="eventos-form-group">
                <label className="eventos-form-label">Empresa Invitante:</label>
                <input
                  type="text"
                  name="empresainvitante"
                  className="eventos-form-input"
                  value={newEvento.empresainvitante}
                  onChange={handleInputChange}
                />
              </div>

              <div className="eventos-form-group">
                <label className="eventos-form-label">Tipo de Evento:</label>
                <select
                  name="idtipoevento"
                  className="eventos-form-input"
                  value={newEvento.idtipoevento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {tipoEventos.map((tipo) => (
                    <option key={tipo.idtipoevento} value={tipo.idtipoevento}>
                      {tipo.nombretipoevento}
                    </option>
                  ))}
                </select>
              </div>

              <div className="eventos-form-actions">
                <button type="submit" className="eventos-btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="eventos-btn-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="eventos-table-container">
          <table className="eventos-data-table">
            <thead className="eventos-table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Lugar</th>
                <th>Fecha</th>
                <th>Duración</th>
                <th>Empresa</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="eventos-table-body">
              {eventos.map((evento) => (
                <tr key={evento.idevento} className="eventos-table-row">
                  <td>{evento.idevento}</td>
                  <td>{evento.nombreevento}</td>
                  <td>{evento.lugarevento}</td>
                  <td>{evento.fechaevento}</td>
                  <td>{evento.duracionevento || "-"}</td>
                  <td>{evento.empresainvitante || "-"}</td>
                  <td>{evento.nombretipoevento}</td>
                  <td className="eventos-actions-cell">
                    <button
                      className="eventos-btn-edit"
                      onClick={() => handleUpdate(evento)}
                    >
                      Editar
                    </button>
                    <button
                      className="eventos-btn-delete"
                      onClick={() => handleDelete(evento.idevento)}
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

export default Eventos;

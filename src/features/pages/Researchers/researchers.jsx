import React, { useEffect, useState } from "react";
import axios from "axios";
import "./researchers.css";
import Sidebar from "../../../components/sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Investigadores = () => {
  const [investigadores, setInvestigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInvestigador, setEditingInvestigador] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [options, setOptions] = useState({
    nivelesEdu: [],
    areas: [],
  });

  const initialInvestigadorState = {
    nombre: "",
    email: "",
    puesto: "Investigador",
    idniveledu: "",
    idarea: "",
  };

  const [newInvestigador, setNewInvestigador] = useState(
    initialInvestigadorState
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [investigadoresRes, nivelesRes, areasRes] = await Promise.all([
          axios
            .get(`${API_BASE_URL}api/investigadores-api/`, {
              withCredentials: true,
            })
            .catch(() => ({ data: [] })),
          axios
            .get(`${API_BASE_URL}api/nivel-edu-api/`, {})
            .catch(() => ({ data: [] })),
          axios
            .get(`${API_BASE_URL}api/areas-api/`, {
              withCredentials: true,
            })
            .catch(() => ({ data: [] })),
        ]);

        setOptions({
          nivelesEdu: nivelesRes.data || [],
          areas: areasRes.data || [],
        });

        setInvestigadores(investigadoresRes.data || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError(`Error al cargar datos: ${error.message}`);
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
        `${API_BASE_URL}api/investigadores-api/`,
        newInvestigador,
        { withCredentials: true }
      );
      setInvestigadores([...investigadores, response.data]);
      setNewInvestigador(initialInvestigadorState);
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
        `${API_BASE_URL}api/investigadores-api/${editingInvestigador.idinvestigadores}/`,
        editingInvestigador,
        { withCredentials: true }
      );
      setInvestigadores(
        investigadores.map((i) =>
          i.idinvestigadores === editingInvestigador.idinvestigadores
            ? response.data
            : i
        )
      );
      setEditingInvestigador(null);
      setError(null);
    } catch (error) {
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este investigador?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/investigadores-api/${id}/`, {
        withCredentials: true,
      });
      setInvestigadores(
        investigadores.filter((i) => i.idinvestigadores !== id)
      );
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
      setEditingInvestigador({
        ...editingInvestigador,
        [name]: value,
      });
    } else {
      setNewInvestigador({
        ...newInvestigador,
        [name]: value,
      });
    }
  };

  if (loading) return <div className="loading">Cargando investigadores...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="investigadores-page">
      <Sidebar />
      <div className="investigadores-content">
        <h2>Gestión de Investigadores</h2>

        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Nuevo Investigador
        </button>

        {showAddForm && (
          <div className="form-container">
            <h3>Registrar Nuevo Investigador</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={newInvestigador.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newInvestigador.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Puesto:</label>
                <input
                  type="text"
                  name="puesto"
                  value={newInvestigador.puesto}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nivel Educativo:</label>
                <select
                  name="idniveledu"
                  value={newInvestigador.idniveledu}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  {options.nivelesEdu.map((nivel) => (
                    <option key={nivel.idniveledu} value={nivel.idniveledu}>
                      {nivel.nombrenivel} {/* Ajusta según tu modelo */}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Área:</label>
                <select
                  name="idarea"
                  value={newInvestigador.idarea}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un área</option>
                  {options.areas.map((area) => (
                    <option key={area.idarea} value={area.idarea}>
                      {area.nombrearea} {/* Ajusta según tu modelo */}
                    </option>
                  ))}
                </select>
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

        {editingInvestigador && (
          <div className="form-container">
            <h3>Editar Investigador</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={editingInvestigador.nombre}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editingInvestigador.email}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Puesto:</label>
                <input
                  type="text"
                  name="puesto"
                  value={editingInvestigador.puesto}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>

              <div className="form-group">
                <label>Nivel Educativo:</label>
                <select
                  name="idniveledu"
                  value={editingInvestigador.idniveledu}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  {options.nivelesEdu.map((nivel) => (
                    <option key={nivel.idniveledu} value={nivel.idniveledu}>
                      {nivel.nombrenivel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Área:</label>
                <select
                  name="idarea"
                  value={editingInvestigador.idarea}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                >
                  <option value="">Seleccione un área</option>
                  {options.areas.map((area) => (
                    <option key={area.idarea} value={area.idarea}>
                      {area.nombrearea}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditingInvestigador(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-container">
          <table className="investigadores-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Puesto</th>
                <th>Nivel Educativo</th>
                <th>Área</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {investigadores.map((investigador) => (
                <tr key={investigador.idinvestigadores}>
                  <td>{investigador.idinvestigadores}</td>
                  <td>{investigador.nombre}</td>
                  <td>{investigador.email}</td>
                  <td>{investigador.puesto}</td>
                  <td>
                    {options.nivelesEdu.find(
                      (n) => n.idniveledu === investigador.idniveledu
                    )?.nombrenivel || "-"}
                  </td>
                  <td>
                    {options.areas.find((a) => a.idarea === investigador.idarea)
                      ?.nombrearea || "-"}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditingInvestigador(investigador)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDelete(investigador.idinvestigadores)
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

export default Investigadores;

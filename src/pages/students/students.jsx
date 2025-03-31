import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import Sidebar from "../sidebar/sidebar.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Opciones para los selects
  const [options, setOptions] = useState({
    tiposEstudiante: [],
    carreras: [],
    investigadores: [],
  });

  // Estado inicial para nuevo estudiante
  const initialStudentState = {
    nombreestudiante: "",
    apellidoestudiante: "",
    emailestudiante: "",
    telefonoestudiante: "",
    fechaingreso: "",
    fechafincontrato: "",
    estatus: true,
    idtipoestudiante: "",
    idcarreras: "",
    idinvestigadores: "",
  };

  const [newStudent, setNewStudent] = useState(initialStudentState);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [estudiantesRes, tiposRes, carrerasRes, investigadoresRes] =
          await Promise.all([
            axios
              .get(`${API_BASE_URL}api/estudiantes-api/`, {
                withCredentials: true,
              })
              .catch((e) => ({ data: [] })), // Si falla, devuelve data vacía
            axios
              .get(`${API_BASE_URL}api/tipo-estudiante-api/`, {
                withCredentials: true,
              })
              .catch((e) => ({ data: [] })),
            axios
              .get(`${API_BASE_URL}api/carreras-api/`, {
                withCredentials: true,
              })
              .catch((e) => ({ data: [] })),
            axios
              .get(`${API_BASE_URL}api/investigadores-api/`, {
                withCredentials: true,
              })
              .catch((e) => ({ data: [] })),
          ]);

        setOptions({
          tiposEstudiante: tiposRes?.data || [], 
          carreras: carrerasRes?.data || [],
          investigadores: investigadoresRes?.data || [],
        });

        setStudents(estudiantesRes?.data || []);
      } catch (error) {
        console.error("Error completo:", error);
        setError(`Error al cargar datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Agregar nuevo estudiante
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/estudiantes-api/`,
        newStudent,
        { withCredentials: true }
      );

      setStudents([...students, response.data]);
      setNewStudent(initialStudentState);
      setShowAddForm(false);
      setError(null);
    } catch (error) {
      setError(
        `Error al registrar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Actualizar estudiante
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/estudiantes-api/${editingStudent.idestudiantes}/`,
        editingStudent,
        { withCredentials: true }
      );

      setStudents(
        students.map((student) =>
          student.idestudiantes === editingStudent.idestudiantes
            ? response.data
            : student
        )
      );
      setEditingStudent(null);
      setError(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError(
        `Error al actualizar: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Eliminar estudiante 
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de dar de baja a este estudiante?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}api/estudiantes-api/${id}/`, {
        withCredentials: true,
      });
      setStudents(students.filter((student) => student.idestudiantes !== id));
      setError(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError(
        `Error al dar de baja: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e, isEditing = false) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (isEditing) {
      setEditingStudent({
        ...editingStudent,
        [name]: val,
      });
    } else {
      setNewStudent({
        ...newStudent,
        [name]: val,
      });
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="students-page">
      <Sidebar />
      <div className="students-content">
        <h2>Gestión de Estudiantes</h2>

        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Nuevo Estudiante
        </button>

        {showAddForm && (
          <div className="form-container">
            <h3>Registrar Nuevo Estudiante</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombreestudiante"
                  value={newStudent.nombreestudiante}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellidoestudiante"
                  value={newStudent.apellidoestudiante}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="emailestudiante"
                  value={newStudent.emailestudiante}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  type="tel"
                  name="telefonoestudiante"
                  value={newStudent.telefonoestudiante}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Fecha de Ingreso:</label>
                <input
                  type="date"
                  name="fechaingreso"
                  value={newStudent.fechaingreso}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Fecha Fin de Contrato:</label>
                <input
                  type="date"
                  name="fechafincontrato"
                  value={newStudent.fechafincontrato}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Estatus:</label>
                <input
                  type="checkbox"
                  name="estatus"
                  checked={newStudent.estatus}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Tipo de Estudiante:</label>
                <select
                  name="idtipoestudiante"
                  value={newStudent.idtipoestudiante}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {options.tiposEstudiante.map((tipo) => (
                    <option
                      key={tipo.idtipoestudiante}
                      value={tipo.idtipoestudiante}
                    >
                      {tipo.nombretipo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Carrera:</label>
                <select
                  name="idcarreras"
                  value={newStudent.idcarreras}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una carrera</option>
                  {options.carreras.map((carrera) => (
                    <option key={carrera.idcarreras} value={carrera.idcarreras}>
                      {carrera.nombrecarrera}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Investigador:</label>
                <select
                  name="idinvestigadores"
                  value={newStudent.idinvestigadores}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un investigador</option>
                  {options.investigadores.map((investigador) => (
                    <option
                      key={investigador.idinvestigadores}
                      value={investigador.idinvestigadores}
                    >
                      {investigador.nombre} {investigador.apellido}
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

        {/* Formulario de edición */}
        {editingStudent && (
          <div className="form-container">
            <h3>Editar Estudiante</h3>
            <form onSubmit={handleUpdate}>
              {/* Campos similares al formulario de agregar */}
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombreestudiante"
                  value={editingStudent.nombreestudiante}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>

              {/* Repetir para los demás campos... */}

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditingStudent(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de estudiantes */}
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Carrera</th>
                <th>Investigador</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.idestudiantes}>
                  <td>{student.idestudiantes}</td>
                  <td>{student.nombreestudiante}</td>
                  <td>{student.apellidoestudiante}</td>
                  <td>{student.emailestudiante}</td>
                  <td>
                    {options.tiposEstudiante.find(
                      (t) => t.idtipoestudiante === student.idtipoestudiante
                    )?.nombretipo || "-"}
                  </td>
                  <td>
                    {options.carreras.find(
                      (c) => c.idcarreras === student.idcarreras
                    )?.nombrecarrera || "-"}
                  </td>
                  <td>
                    {options.investigadores.find(
                      (i) => i.idinvestigadores === student.idinvestigadores
                    )?.nombre || "-"}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditingStudent(student)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(student.idestudiantes)}
                    >
                      Baja
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

export default Students;

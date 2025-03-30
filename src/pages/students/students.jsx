import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import Sidebar from "../sidebar/sidebar.jsx";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [options, setOptions] = useState({
    tiposEstudiante: [],
    carreras: [],
    investigadores: []
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
    idinvestigadores: ""
  };

  const [newStudent, setNewStudent] = useState(initialStudentState);

  // Obtener datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [estudiantesRes, tiposRes, carrerasRes, investigadoresRes] = await Promise.all([
          axios.get("http://localhost:8000/api/estudiantes-api/", { withCredentials: true }),
          axios.get("http://localhost:8000/api/tipo-estudiante-api/", { withCredentials: true }),
          axios.get("http://localhost:8000/api/carreras-api/", { withCredentials: true }),
          axios.get("http://localhost:8000/api/investigadores-api/", { withCredentials: true })
        ]);

        // Generar próximo ID (máximo existente + 1)
        const maxId = estudiantesRes.data.reduce((max, student) => 
          Math.max(max, student.idestudiantes), 0);
        
        setNewStudent(prev => ({
          ...prev,
          idestudiantes: maxId + 1
        }));

        setOptions({
          tiposEstudiante: tiposRes.data,
          carreras: carrerasRes.data,
          investigadores: investigadoresRes.data
        });

        setStudents(estudiantesRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
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
        "http://localhost:8000/api/estudiantes-api/",
        newStudent,
        { withCredentials: true }
      );
      
      setStudents([...students, response.data]);
      setNewStudent({
        ...initialStudentState,
        // Generar nuevo ID para el próximo registro
        idestudiantes: newStudent.idestudiantes + 1
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al agregar:", error.response?.data || error);
      setError(`Error al registrar: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  // Actualizar estudiante
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/estudiantes-api/${editingStudent.idestudiantes}/`,
        editingStudent,
        { withCredentials: true }
      );
      
      setStudents(students.map(student => 
        student.idestudiantes === editingStudent.idestudiantes ? response.data : student
      ));
      setEditingStudent(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError(`Error al actualizar: ${error.response?.data || error.message}`);
    }
  };

  // Eliminar estudiante
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de dar de baja a este estudiante?")) return;
    
    try {
      await axios.delete(
        `http://localhost:8000/api/estudiantes-api/${id}/`,
        { withCredentials: true }
      );
      setStudents(students.filter(student => student.idestudiantes !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError(`Error al dar de baja: ${error.response?.data || error.message}`);
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingStudent({
        ...editingStudent,
        [name]: value
      });
    } else {
      setNewStudent({
        ...newStudent,
        [name]: value
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

        {/* Formulario para agregar */}
        {showAddForm && (
          <div className="form-container">
            <h3>Registrar Nuevo Estudiante</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>ID Estudiante:</label>
                <input
                  type="text"
                  value={newStudent.idestudiantes}
                  readOnly
                  className="read-only"
                />
              </div>

              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombreestudiante"
                  value={newStudent.nombreestudiante}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              {/* Repetir para apellido, email, teléfono */}

              <div className="form-group">
                <label>Tipo de Estudiante:</label>
                <select
                  name="idtipoestudiante"
                  value={newStudent.idtipoestudiante}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {options.tiposEstudiante.map(tipo => (
                    <option key={tipo.idtipoestudiante} value={tipo.idtipoestudiante}>
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
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="">Seleccione una carrera</option>
                  {options.carreras.map(carrera => (
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
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="">Seleccione un investigador</option>
                  {options.investigadores.map(investigador => (
                    <option key={investigador.idinvestigadores} value={investigador.idinvestigadores}>
                      {investigador.nombre} {investigador.apellido}
                    </option>
                  ))}
                </select>
              </div>

              {/* Agregar campos restantes */}

              <div className="form-actions">
                <button type="submit" className="btn-save">Guardar</button>
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

        {/* Tabla de estudiantes */}
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo</th>
                <th>Carrera</th>
                <th>Investigador</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.idestudiantes}>
                  <td>{student.idestudiantes}</td>
                  <td>{student.nombreestudiante}</td>
                  <td>{student.apellidoestudiante}</td>
                  <td>{student.idtipoestudiante?.nombretipo || '-'}</td>
                  <td>{student.idcarreras?.nombrecarrera || '-'}</td>
                  <td>
                    {student.idinvestigadores?.nombreinvestigador || '-'} 
                    {student.idinvestigadores?.apellidoinvestigador && ` ${student.idinvestigadores.apellidoinvestigador}`}
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
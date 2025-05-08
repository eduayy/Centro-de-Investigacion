import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";
import StudentCard from "./StudentsCard.jsx";
import StudentsForm from "./StudentsForm.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [options, setOptions] = useState({
    tiposEstudiante: [],
    carreras: [],
    investigadores: [],
  });

  const initialStudentState = {
    nombreestudiante: "",
    apellidoestudiante: "",
    emailestudiante: "",
    telefonoestudiante: "",
    fechaingreso: "",
    fechafincontrato: "",
    estatus: true,
    idtipoestudiante: "",
    idcarrera: "",
    idinvestigadores: "",
  };

  const [newStudent, setNewStudent] = useState(initialStudentState);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [estudiantesRes, tiposRes, carrerasRes, investigadoresRes] =
          await Promise.all([
            axios.get(`${API_BASE_URL}api/estudiantes-api/`, {
              withCredentials: true,
            }),
            /*axios.get(`${API_BASE_URL}api/tipoestudiantes-api/`, {
              withCredentials: true,
            }), */
            axios.get(`${API_BASE_URL}api/carreras-api/`, {
              withCredentials: true,
            }),
            axios.get(`${API_BASE_URL}api/investigadores-api/`, {
              withCredentials: true,
            }),
          ]);
        console.log(carrerasRes.data);
        setOptions({
          tiposEstudiante: tiposRes?.data || [],
          carreras: carrerasRes?.data || [],
          investigadores: investigadoresRes?.data || [],
        });

        setStudents(estudiantesRes?.data || []);
      } catch (error) {
        setError(`Error al cargar datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const getNombreCarrera = (idCarrera) => {
    const carrera = options.carreras.find((c) => c.idcarreras === idCarrera);
    return carrera ? carrera.nombrecarrera : "Carrera no especificada";
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleClosePopup = () => {
    setSelectedStudent(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const carreraSeleccionada = options.carreras.find(
      (c) => c.nombrecarrera === newStudent.nombrecarrera
    );

    if (!carreraSeleccionada) {
      setError("Por favor seleccione una carrera válida de la lista");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/estudiantes-api/`,
        {
          ...newStudent,
          idcarreras: carreraSeleccionada.idcarreras,
        },
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

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="students-container">
      <Sidebar />
      <main className="students-main">
        <header className="students-header">
          <h1>Gestión de Estudiantes</h1>
          <p>Administra los estudiantes registrados en el sistema</p>
        </header>

        <div className="students-actions">
          <button
            className="primary-button"
            onClick={() => setShowAddForm(true)}
          >
            <span className="plus-icon">+</span> Nuevo Estudiante
          </button>
        </div>

        {showAddForm && (
          <div className="modal-overlay">
            <StudentsForm
              title="Nuevo Estudiante"
              student={newStudent}
              options={options}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  [e.target.name]: e.target.value,
                })
              }
              onSubmit={handleAdd}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <section className="students-data">
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.idestudiantes}
                    onClick={() => handleSelectStudent(student)}
                    className="clickable-row"
                  >
                    <td>{student.idestudiantes}</td>
                    <td>{student.nombreestudiante}</td>
                    <td>{student.apellidoestudiante}</td>
                    <td>{student.emailestudiante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selectedStudent && (
          <div className="modal-overlay">
            <StudentCard
              student={selectedStudent}
              carreraNombre={getNombreCarrera(selectedStudent.idcarreras)}
              onClose={handleClosePopup}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Students;

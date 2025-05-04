import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import Sidebar from "@/components/sidebar/sidebar.jsx";
import StudentCard from "./StudentsCard.jsx";

const API_BASE_URL = "http://localhost:8000/";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Estado para el estudiante seleccionado

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
              .catch(() => ({ data: [] })),
            axios
              .get(`${API_BASE_URL}api/tipoestudiantes-api/`, {
                withCredentials: true,
              })
              .catch(() => ({ data: [] })),
            axios
              .get(`${API_BASE_URL}api/carreras-api/`, {
                withCredentials: true,
              })
              .catch(() => ({ data: [] })),
            axios
              .get(`${API_BASE_URL}api/investigadores-api/`, {
                withCredentials: true,
              })
              .catch(() => ({ data: [] })),
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

  // Mostrar popup al seleccionar un estudiante
  const handleSelectStudent = (student) => {
    setSelectedStudent(student); // Establece el estudiante seleccionado
  };

  const handleClosePopup = () => {
    setSelectedStudent(null); // Cierra el popup
  };

  // Agregar nuevo estudiante
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", newStudent);
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
      console.error("Error al registrar:", error.response || error);
      setError(
        `Error al registrar: ${error.response?.data?.detail || error.message}`
      );
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

        <StudentCard student={selectedStudent} onClose={handleClosePopup} />

        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";
import Sidebar from "../sidebar/sidebar.jsx";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/estudiantes/");
        console.log("Datos recibidos:", response.data); // Verifica aquí los datos
        setStudents(response.data);
      } catch (error) {
        console.error("Error completo:", error.response); // Muestra más detalles
        setError(`Error al cargar estudiantes: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="students-page">
      <Sidebar />
      <div className="students-content">
        <h2>Lista de Estudiantes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : students.length === 0 ? (
          <p>No hay estudiantes registrados</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {student.nombre} {student.apellido}{" "}
                {/* Ajusta los campos según tu modelo */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Students;

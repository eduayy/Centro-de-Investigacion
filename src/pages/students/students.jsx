import "./students.css";
import Sidebar from "../sidebar/sidebar.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // With this code we can get the user permissions 
  // verify if the user is already logged in and permissions
  const isLoggedIn = localStorage.getItem("usuario_id");
  const permissions = localStorage.getItem("permisos");
  const role = localStorage.getItem("role");

  /* 
    ROLE PERMISSIONS:
    1. Admin
    2. Researcher
    3. Student
    4. Guest

    Role permissions are defined in table 'permisos' in 'investigadores_database'
    */

  // Verify wich permissions the role has
  const addNew = role === "1" || role === "2";
  const canDelete = role === "1" || role === "2";
  const editStudents = role === "1" || role === "2";
  const onlyView = role === "3" || role === "2" || role === "4";
  const fullAccess = role === "1";

  // Use axios to get student data from the API with useeffect
  useEffect(() => {
    const fetchStudents = async () => {
      // get connection to backend api
      try {
        const response = await axios.get("http://localhost:8000/api/students/");
        setStudents(response.data);
        setError("");
      } catch (error) {
        setError("Error obtaining students.", error.toString());
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
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {student.name}
                {canDelete && (
                  <button
                    onClick={() =>
                      console.log(`Eliminar estudiante ${student.id}`)
                    }
                  >
                    Eliminar
                  </button>
                )}
                {editStudents && (
                  <button
                    onClick={() =>
                      console.log(`Editar estudiante ${student.id}`)
                    }
                  >
                    Editar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {addNew && (
          <button onClick={() => console.log("Añadir estudiante")}>
            Añadir Estudiante
          </button>
        )}
        {!fullAccess && <p>Limited access.</p>}
      </div>
    </div>
  );
};

export default Students;

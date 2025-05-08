import React from "react";

const CareersTable = ({ carreras, onEdit, onDelete }) => {
  return (
    <div className="careers-data">
      <table className="careers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Universidad</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.idcarreras}>
              <td>{carrera.idcarreras}</td>
              <td>{carrera.nombrecarrera}</td>
              <td>{carrera.nombreuniversidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareersTable;
